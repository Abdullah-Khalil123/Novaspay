import prisma from '../../../prisma/client.js';

const getApplications = async (req, res) => {
  const { limit, page } = req.query;
  const { applicationNo, status } = req.query;
  try {
    const applications = await prisma.applications.findMany({
      where: {
        clientId: req.user.id,
        status: status ? { equals: status } : undefined,
        id: (applicationNo ? parseInt(applicationNo) : undefined) || undefined,
      },
      include: { client: true, approver: true },
      take: parseInt(limit) || 10,
      skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
    });
    return res.status(200).json({
      message: 'Applications retrieved successfully',
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const createApplication = async (req, res) => {
  const {
    area,
    vaBankAccount,
    transactionType,
    toCurrency,
    cryptoAddress,
    amount,
    estimatedAmount,
    estimatedFee,
    fromCurrency,
    referenceRate,
    totalAmount,
  } = req.body;
  try {
    const newApplication = await prisma.applications.create({
      data: {
        clientId: req.user.id,
        area,
        vaBankAccount,
        transactionType,
        toCurrency,
        cryptoAddress,
        amount,
        estimatedAmount,
        estimatedFee,
        fromCurrency,
        referenceRate,
        totalAmount,
        status: 'pending',
      },
    });
    return res.status(201).json({
      message: 'Application created successfully',
      data: newApplication,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

export { getApplications, createApplication };
