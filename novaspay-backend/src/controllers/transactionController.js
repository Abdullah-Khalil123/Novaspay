import prisma from '../../prisma/client.js';

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany();
    return res.status(200).json({
      message: 'Transactions retrieved successfully',
      data: transactions,
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
      where: { id: parseInt(id) },
    });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    return res.status(200).json({
      message: 'Transaction retrieved successfully',
      data: transaction,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const createTransaction = async (req, res) => {
  const {
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
