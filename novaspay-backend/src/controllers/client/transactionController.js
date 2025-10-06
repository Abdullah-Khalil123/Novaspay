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

const getTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: parseInt(id, 10),
        clientId: req.user.id, // assuming JWT auth
      },
      include: {
        client: {
          include: {
            account: true, // include account details
            kyc: true, // include KYC details (for name, address, etc)
          },
        },
      },
    });

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found',
      });
    }

    // construct full data object for frontend
    const response = {
      id: transaction.id,
      orderId: transaction.orderId || '--',
      status: transaction.status,
      amount: transaction.amount || 0,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,

      // from transaction table
      fromAccountId: transaction.paymentAccount || '--',
      receiverName: transaction.receiverName || '--',
      receiverNumber: transaction.receiverNumber || '--',
      accountName: transaction.accountName || '--',
      orderType: transaction.orderType || '--',

      // from client and account
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

export { getTransactions, getTransaction };
