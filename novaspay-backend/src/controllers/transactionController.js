import prisma from '../../prisma/client.js';

const getAllTransactions = async (req, res) => {
  const {
    limit,
    page,
    orderId,
    receiverName,
    receiverNumber,
    accountName,
    orderType,
    status,
    email,
  } = req.query;

  try {
    const take = parseInt(limit) || 10;
    const skip = ((parseInt(page) || 1) - 1) * take;

    // Base filters
    const where = {
      accountName: accountName ? { contains: accountName } : undefined,
      orderId: orderId ? { contains: orderId } : undefined,
      receiverName: receiverName ? { contains: receiverName } : undefined,
      receiverNumber: receiverNumber ? { contains: receiverNumber } : undefined,
      orderType: orderType ? { equals: orderType } : undefined,
      status: status ? { equals: status } : undefined,
    };

    // Role-based filtering
    if (req.user.role === 'ADMIN') {
      // Only transactions of clients invited by this admin
      where.client = {
        invitedBy: {
          inviterId: req.user.id,
        },
      };
    } else if (email) {
      // Filter by client email for SUPER_ADMIN
      where.client = {
        email: {
          contains: email,
        },
      };
    }

    const transactions = await prisma.transaction.findMany({
      take,
      skip,
      where,
      include: {
        client: true, // Include client info if needed
      },
    });

    const total = await prisma.transaction.count({ where });

    return res.status(200).json({
      message: 'Transactions retrieved successfully',
      data: transactions,
      pagination: { limit: take, page: parseInt(page) || 1, total },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        client: {
          include: {
            account: true,
            kyc: true,
          },
        },
      },
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // structure response to match your frontend needs
    const response = {
      id: transaction.id,
      orderId: transaction.orderId || '--',
      status: transaction.status || 'PENDING',
      amount: transaction.amount || 0,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      orderType: transaction.orderType || '--',
      reason: transaction.reason || '--',
      receiverName: transaction.receiverName || '--',
      receiverNumber: transaction.receiverNumber || '--',
      accountName: transaction.accountName || '--',
      paymentAccount: transaction.paymentAccount || '--',

      // extended data
      fromAccountId: transaction.paymentAccount || '--',
      clientId: transaction.client.id || '',
      customerName: transaction.client?.name || '--',
      customerAddress:
        transaction.client?.kyc?.companyAddress ||
        transaction.client?.kyc?.city ||
        '--',
      iban: transaction.client?.account?.ibanNumber || '--',
      bankName: transaction.client?.account?.bankingName || '--',
      bankCurrency: transaction.client?.account?.currency || '--',
      city: transaction.client?.account?.city || '--',
      street: transaction.client?.account?.bankingAddress || '--',
      postalCode: transaction.client?.kyc?.postalCode || '--',
      orderingCustomer: transaction.client?.email || '--',
    };

    return res.status(200).json({
      message: 'Transaction retrieved successfully',
      data: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const createTransaction = async (req, res) => {
  const {
    clientId,
    orderId,
    accountName,
    paymentAccount,
    receiverName,
    receiverNumber,
    amount,
    fee,
    status,
    orderType,
    reason,
  } = req.body;

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        clientId,
        orderId,
        accountName,
        paymentAccount,
        receiverName,
        receiverNumber,
        amount,
        fee,
        status,
        orderType,
        reason,
      },
    });
    return res.status(201).json({
      message: 'Transaction created successfully',
      data: newTransaction,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const data = {};

  [
    'orderId',
    'accountName',
    'paymentAccount',
    'receiverName',
    'receiverNumber',
    'amount',
    'fee',
    'status',
    'orderType',
    'reason',
  ].forEach((field) => {
    if (req.body[field] !== undefined) {
      data[field] = req.body[field];
    }
  });
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    const updatedTransaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data,
    });

    return res.status(200).json({
      message: 'Transaction updated successfully',
      data: updatedTransaction,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

export {
  getAllTransactions,
  createTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
