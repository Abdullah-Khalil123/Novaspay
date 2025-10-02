import prisma from '../../../prisma/client.js';

const getAccounts = async (req, res) => {
  const { limit, page } = req.query;
  const {
    accountNumber,
    bankingName,
    ibanNumber,
    accountName,
    currency,
    status,
  } = req.query;
  try {
    const accounts = await prisma.account.findMany({
      where: {
        clientId: req.user.id,
        accountNumber: accountNumber ? { contains: accountNumber } : undefined,
        bankingName: bankingName ? { contains: bankingName } : undefined,
        ibanNumber: ibanNumber ? { contains: ibanNumber } : undefined,
        accountName: accountName ? { contains: accountName } : undefined,
        currency: currency ? { contains: currency } : undefined,
        status: status
          ? {
              contains: status,
            }
          : undefined,
      },
      take: parseInt(limit) || 10,
      skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
    });
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

export { getAccounts };
