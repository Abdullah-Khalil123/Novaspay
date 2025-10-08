import bcrypt from 'bcryptjs';
import prisma from '../../prisma/client.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    const { password: hashedPassword, ...userWithoutPassword } = user;
    return res.status(200).json({
      message: 'Login successful',
      user: userWithoutPassword,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  const { page = 1, limit, search } = req.query;
  const skip = (page - 1) * (limit ? parseInt(limit) : 10);

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: search || '', mode: 'insensitive' } },
          { email: { contains: search || '', mode: 'insensitive' } },
        ],
      },
      skip: skip,
      take: limit ? parseInt(limit) : undefined,
    });

    const totalUsers = await prisma.user.count();
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    return res.status(200).json({
      message: 'Users retrieved successfully',
      data: users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: parseInt(page),
        totalItems: totalUsers,
        limit: limit ? parseInt(limit) : users.length,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// const updateUserRole = async (req, res) => {
//   const { userId, role } = req.body;
//   if (!userId || !role) {
//     return res.status(400).json({ message: 'Please provide userId and role' });
//   }
//   try {
//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: { role },
//     });
//     return res.status(200).json({
//       message: 'User role updated successfully',
//       user: updatedUser,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: 'Server error',
//       error: error.message,
//     });
//   }
// };

const createUser = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    if (!email || !password || !name || !role) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { password, ...userWithoutPassword } = user;
    return res.status(200).json({
      message: 'User retrieved successfully',
      data: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (role) updatedData.role = role;
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });
    const { password: _, ...userWithoutPassword } = updatedUser;

    return res.status(200).json({
      message: 'User updated successfully',
      data: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
export {
  register,
  login,
  getAllUsers,
  // updateUserRole,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
