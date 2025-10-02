import prisma from '../../../prisma/client.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
  const { name, email, password, country, accountType } = req.body;
  try {
    const existingClient = await prisma.client.findUnique({
      where: { email },
    });
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newClient = await prisma.client.create({
      data: {
        name,
        email,
        password: hashedPassword,
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
export { clientLogin, clientResetPassword, clientRegister };
