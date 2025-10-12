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
  const {
    limit,
    page,
    accountNumber,
    bankingName,
    ibanNumber,
    accountName,
    currency,
    status,
    userId,
  } = req.query;

  try {
    const take = parseInt(limit) || 10;
    const skip = ((parseInt(page) || 1) - 1) * take;

    // Base where filters
    const where = {
      accountNumber: accountNumber ? { contains: accountNumber } : undefined,
      bankingName: bankingName ? { contains: bankingName } : undefined,
      ibanNumber: ibanNumber ? { contains: ibanNumber } : undefined,
      accountName: accountName ? { contains: accountName } : undefined,
      currency: currency ? { contains: currency } : undefined,
      status: status ? { equals: status } : undefined,
    };

    // Role-based filtering
    if (req.user.role === 'ADMIN') {
      // Only accounts of clients invited by this admin
      where.client = {
        invitedBy: {
          inviterId: req.user.id,
        },
      };
    } else if (userId) {
      // Filter by clientId if provided (for SUPER_ADMIN)
      where.clientId = parseInt(userId);
    }

    const accounts = await prisma.account.findMany({
      take,
      skip,
      where,
      include: {
        client: true, // optional, if you want client info
      },
    });

    const total = await prisma.account.count({
      where,
    });

    return res.status(200).json({
      message: 'Accounts retrieved successfully',
      data: accounts,
      pagination: { limit: take, page: parseInt(page) || 1, total },
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
    clientId,
  } = req.body;
  try {
    const newAccount = await prisma.account.create({
      data: {
        bankingName,
        currency,
        clientName,
        ibanNumber,
        balance,
        client: {
          connect: {
            id: clientId,
          },
        },
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
