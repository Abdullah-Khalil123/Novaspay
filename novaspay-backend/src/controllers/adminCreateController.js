import prisma from '../../prisma/client.js';
import bcrypt from 'bcryptjs';

const createAdmin = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return res.status(201).json({
      message: 'User created successfully',
      data: { id: newUser.id, email: newUser.email, name: newUser.name },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// ✅ GET ALL USERS
const getAdmins = async (req, res) => {
  const { name, email, page, limit } = req.query;
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, lastActive: true },
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
        email: email ? { contains: email, mode: 'insensitive' } : undefined,
      },
      skip: page && limit ? (Number(page) - 1) * Number(limit) : undefined,
      take: limit ? Number(limit) : undefined,
      orderBy: { id: 'asc' },
    });
    return res.status(200).json({
      message: 'Users retrieved successfully',
      data: users,
      pagination: {
        total: await prisma.user.count({}),
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : users.length,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// ✅ GET SINGLE USER BY ID
const getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { id: true, email: true, name: true, lastActive: true },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// ✅ UPDATE USER
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    let updatedData = { name, email };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: updatedData,
      select: { id: true, email: true, name: true },
    });

    return res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// ✅ DELETE USER
const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    await prisma.user.delete({ where: { id: Number(id) } });
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

export { createAdmin, deleteAdmin, getAdmins, getAdminById, updateAdmin };
