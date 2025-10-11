import prisma from '../../prisma/client.js';

const getApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await prisma.applications.findUnique({
      where: { id: parseInt(id) },
      include: { client: true, approver: true },
    });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    return res.status(200).json({
      message: 'Application retrieved successfully',
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const getAllApplications = async (req, res) => {
  const { limit, page } = req.query;
  const {
    area,
    vaBankAccount,
    transactionType,
    toCurrency,
    cryptoAddress,
    status,
    email,
  } = req.query;

  try {
    const applications = await prisma.applications.findMany({
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
        area: area ? { contains: area } : undefined,
        vaBankAccount: vaBankAccount ? { contains: vaBankAccount } : undefined,
        transactionType: transactionType
          ? { contains: transactionType }
          : undefined,
        toCurrency: toCurrency ? { contains: toCurrency } : undefined,
        cryptoAddress: cryptoAddress ? { contains: cryptoAddress } : undefined,
        status: status ? { equals: status } : undefined,
      },
      include: { client: true, approver: true },
    });

    return res.status(200).json({
      message: 'Applications retrieved successfully',
      data: applications,
      pagination: {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
        total: await prisma.applications.count(),
      },
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
    clientId,
    area,
    vaBankAccount,
    transactionType,
    toCurrency,
    amount,
    cryptoAddress,
    referenceRate,
    totalAmount,
    estimatedFee,
    estimatedAmount,
    approverId,
    approvalComments,
    remark,
    status,
  } = req.body;

  try {
    const newApplication = await prisma.applications.create({
      data: {
        clientId,
        area,
        vaBankAccount,
        transactionType,
        toCurrency,
        amount,
        cryptoAddress,
        referenceRate,
        totalAmount,
        estimatedFee,
        estimatedAmount,
        approverId,
        approvalComments,
        remark,
        status: status || 'pending',
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

const updateApplication = async (req, res) => {
  const { id } = req.params;
  const data = {};

  [
    'clientId',
    'area',
    'vaBankAccount',
    'transactionType',
    'toCurrency',
    'amount',
    'cryptoAddress',
    'referenceRate',
    'totalAmount',
    'estimatedFee',
    'estimatedAmount',
    'approverId',
    'approvalComments',
    'remark',
    'status',
  ].forEach((field) => {
    if (req.body[field] !== undefined) {
      data[field] = req.body[field];
    }
  });

  try {
    const application = await prisma.applications.findUnique({
      where: { id: parseInt(id) },
    });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const updatedApplication = await prisma.applications.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
        approverId: req.user.id,
      },
    });

    return res.status(200).json({
      message: 'Application updated successfully',
      data: updatedApplication,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await prisma.applications.findUnique({
      where: { id: parseInt(id) },
    });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    await prisma.applications.delete({
      where: { id: parseInt(id) },
    });

    return res
      .status(200)
      .json({ message: 'Application deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

export {
  getApplicationById,
  getAllApplications,
  createApplication,
  updateApplication,
  deleteApplication,
};
