import prisma from '../../../prisma/client.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from '../../utils/mailer.js';

const clientLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await prisma.client.findUnique({
      where: { email },
    });
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign(
      {
        id: client.id,
        name: client.name,
        email: client.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    const { password: hashedPassword, ...userWithoutPassword } = client;
    await prisma.client.update({
      where: { id: client.id },
      data: { loginTime: new Date() },
    });
    return res.status(200).json({
      message: 'Client logged in successfully',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const clientResetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Please provide all fields' });
  } else if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: 'New password must be at least 6 characters' });
  } else if (oldPassword === newPassword) {
    return res
      .status(400)
      .json({ message: 'New password must be different from old password' });
  }
  try {
    const client = await prisma.client.findUnique({
      where: {
        id: req.user.id,
      },
    });
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, client.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid old password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await prisma.client.update({
      where: {
        id: client.id,
      },
      data: { password: hashedNewPassword },
    });

    return res.status(200).json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const clientRegister = async (req, res) => {
  const {
    name,
    email,
    password,
    country,
    accountType,
    invitationCode,
    verificationCode, // OTP from frontend
  } = req.body;

  try {
    // 1️⃣ Check if client already exists
    const existingClient = await prisma.client.findUnique({
      where: { email },
    });
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists' });
    }

    // 2️⃣ Check OTP record for this email
    const otpRecord = await prisma.emailVerification.findUnique({
      where: { email },
    });

    if (!otpRecord) {
      return res.status(400).json({ message: 'No OTP found for this email' });
    }

    // 3️⃣ Validate OTP
    if (otpRecord.otp !== verificationCode) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({ message: 'Verification code expired' });
    }

    // 4️⃣ Delete OTP after successful verification
    const tm = await prisma.emailVerification.delete({
      where: { email },
    });

    // 5️⃣ Validate invitation code
    const invite = await prisma.invite.findUnique({
      where: { code: invitationCode },
    });

    if (!invite || invite.used) {
      return res.status(400).json({ error: 'Invalid or already used invite' });
    }

    await prisma.invite.update({
      where: { id: invite.id },
      data: { used: true, usedAt: new Date() },
    });

    // 6️⃣ Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newClient = await prisma.client.create({
      data: {
        name,
        email,
        password: hashedPassword,
        invitationCode,
        country,
        type: accountType,
      },
    });

    return res.status(201).json({
      message: 'Client registered successfully',
      data: newClient,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const sendVerificationOTP = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).json({ message: 'Email is required' });

    // Check if already registered
    const existingClient = await prisma.client.findUnique({ where: { email } });
    if (existingClient) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Check if OTP was sent recently (within 1 minute)
    const lastOTP = await prisma.emailVerification.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
    });

    if (lastOTP && Date.now() - lastOTP.createdAt.getTime() < 60 * 1000) {
      const secondsLeft = Math.ceil(
        (60 * 1000 - (Date.now() - lastOTP.createdAt.getTime())) / 1000
      );
      return res.status(429).json({
        message: `Please wait ${secondsLeft}s before requesting a new OTP.`,
      });
    }

    // Generate new 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Delete old OTPs
    await prisma.emailVerification.deleteMany({ where: { email } });

    // Save new OTP (expires in 5 mins)
    await prisma.emailVerification.create({
      data: {
        email,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        createdAt: new Date(), // ensure model includes this field
      },
    });

    // Send OTP Email
    await sendEmail(email, 'Verify Your Email', otp);

    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const sendForgetOTP = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const existingClient = await prisma.client.findUnique({ where: { email } });
    if (!existingClient) {
      return res.status(400).json({ message: 'Email is not registered' });
    }

    // Check if OTP was sent recently (within 1 minute)
    const lastOTP = await prisma.emailVerification.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
    });

    if (lastOTP && Date.now() - lastOTP.createdAt.getTime() < 60 * 1000) {
      const secondsLeft = Math.ceil(
        (60 * 1000 - (Date.now() - lastOTP.createdAt.getTime())) / 1000
      );
      return res.status(429).json({
        message: `Please wait ${secondsLeft}s before requesting a new OTP.`,
      });
    }

    // Generate new 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Delete old OTPs
    await prisma.emailVerification.deleteMany({ where: { email } });

    // Save new OTP (expires in 5 mins)
    await prisma.emailVerification.create({
      data: {
        email,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        createdAt: new Date(), // ensure model includes this field
      },
    });

    // Send OTP Email
    await sendEmail(email, 'Verify Your Email', otp);

    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const verifyEmailOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = await prisma.emailVerification.findUnique({
      where: { email },
    });
    if (!record) {
      return res.status(400).json({ message: 'No OTP found for this email' });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (new Date() > record.expiresAt) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Delete OTP after success
    await prisma.emailVerification.delete({ where: { email } });

    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;

  try {
    // 1️⃣ Validate input
    if (!email || !verificationCode || !newPassword) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' });
    }

    // 2️⃣ Check if client exists
    const client = await prisma.client.findUnique({
      where: { email },
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // 3️⃣ Check OTP record
    const otpRecord = await prisma.emailVerification.findUnique({
      where: { email },
    });

    if (!otpRecord) {
      return res.status(400).json({ message: 'No OTP found for this email' });
    }

    // 4️⃣ Validate OTP
    if (otpRecord.otp !== verificationCode) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({ message: 'Verification code expired' });
    }

    // 5️⃣ Delete OTP after successful verification
    await prisma.emailVerification.delete({
      where: { email },
    });

    // 6️⃣ Hash new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.client.update({
      where: { id: client.id },
      data: { password: hashedPassword },
    });

    return res.status(200).json({
      message: 'Password reset successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
export {
  clientLogin,
  clientResetPassword,
  sendForgetOTP,
  clientRegister,
  verifyEmailOTP,
  sendVerificationOTP,
  forgotPassword,
};
