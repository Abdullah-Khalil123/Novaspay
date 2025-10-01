import prisma from '../../prisma/client.js';
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

const createClient = async (req, res) => {
  await prisma.client.create({
    data: {
      name: 'Test Client',
      email: 'client2@test.com',
      password: await bcrypt.hash('password123', 10),
      type: 'standard',
      country: 'US',
      loginTime: new Date(),
    },
  });
  return res.status(201).json({ message: 'Test client created' });
};

export { clientLogin, createClient };
