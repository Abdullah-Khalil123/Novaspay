import prisma from '../../prisma/client.js';

const getAccountById = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await prisma.account.findUnique({
      where: { id: parseInt(id) },
    });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    return res.status(200).json({
      message: 'Account retrieved successfully',
      data: account,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await prisma.account.findMany();
    return res.status(200).json({
      message: 'Accounts retrieved successfully',
      data: accounts,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const createAccount = async (req, res) => {
  const {
    bankingName,
    currency,
    clientName,
    ibanNumber,
    balance,
    realBalance,
    accountNumber,
    accountName,
    bankingAddress,
  } = req.body;
  try {
    const newAccount = await prisma.account.create({
      data: {
        bankingName,
        currency,
        clientName,
        ibanNumber,
        balance,
        realBalance,
        accountNumber,
        accountName,
        bankingAddress,
      },
    });
    return res.status(201).json({
      message: 'Account created successfully',
      data: newAccount,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const updateAccount = async (req, res) => {
  const { id } = req.params;
  const data = {};

  [
    'bankingName',
    'currency',
    'clientName',
    'ibanNumber',
    'balance',
    'realBalance',
    'accountNumber',
    'accountName',
    'bankingAddress',
  ].forEach((field) => {
    if (req.body[field] !== undefined) {
      data[field] = req.body[field];
    }
  });

  try {
    const account = await prisma.account.findUnique({
      where: { id: parseInt(id) },
    });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    const updatedAccount = await prisma.account.update({
      where: { id: parseInt(id) },
      data,
    });
    return res.status(200).json({
      message: 'Account updated successfully',
      data: updatedAccount,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await prisma.account.findUnique({
      where: { id: parseInt(id) },
    });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    await prisma.account.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

export {
  getAccountById,
  getAllAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
};
