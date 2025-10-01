import prisma from '../../../prisma/client.js';

const getTransactions = async (req, res) => {
  const { limit, page } = req.query;
  const { orderId, receiverName, receiverNumber, orderType, status } =
    req.query;
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        clientId: req.user.id,
        orderId: orderId ? { contains: orderId } : undefined,
        receiverName: receiverName ? { contains: receiverName } : undefined,
        receiverNumber: receiverNumber
          ? { contains: receiverNumber }
          : undefined,
        orderType: orderType ? { equals: orderType } : undefined,
        status: status ? { equals: status } : undefined,
      },
      take: parseInt(limit) || 10,
      skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
    });
    return res.status(200).json({
      message: 'Transactions retrieved successfully',
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

export { getTransactions };
