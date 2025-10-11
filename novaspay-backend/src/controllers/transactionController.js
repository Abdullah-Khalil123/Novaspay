import prisma from '../../prisma/client.js';

const getAllTransactions = async (req, res) => {
  const { limit, page } = req.query;
  const {
    orderId,
    receiverName,
    receiverNumber,
    accountName,
    orderType,
    status,
    email,
  } = req.query;
  try {
    const transactions = await prisma.transaction.findMany({
      take: parseInt(limit) || 10,
      skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
      where: {
        client: email
          ? {
              email: {
                contains: email,
              },
            }
          : undefined,
        accountName: accountName ? { contains: accountName } : undefined,
        orderId: orderId ? { contains: orderId } : undefined,
        receiverName: receiverName ? { contains: receiverName } : undefined,
        receiverNumber: receiverNumber
          ? { contains: receiverNumber }
          : undefined,
        orderType: orderType ? { equals: orderType } : undefined,
        status: status ? { equals: status } : undefined,
      },
      include: {
        client: true,
      },
    });

    return res.status(200).json({
      message: 'Transactions retrieved successfully',
      data: transactions,
      pagination: {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
        total: await prisma.transaction.count(),
      },
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
