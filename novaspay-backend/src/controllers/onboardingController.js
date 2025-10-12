import prisma from '../../prisma/client.js';

// Get OnBoarding by ID
const getOnBoardingById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await prisma.onBoarding.findUnique({
      where: { id: parseInt(id) },
    });
    if (!record) {
      return res.status(404).json({ message: 'OnBoarding record not found' });
    }
    return res
      .status(200)
      .json({ message: 'OnBoarding retrieved successfully', data: record });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// Get all OnBoarding records
const getAllOnBoardings = async (req, res) => {
  const { limit, page } = req.query;

  try {
    const take = parseInt(limit) || 10;
    const skip = ((parseInt(page) || 1) - 1) * take;

    const where = {};

    if (req.user.role === 'ADMIN') {
      // Only OnBoardings of clients invited by this admin
      where.client = {
        invitedBy: {
          inviterId: req.user.id,
        },
      };
    }

    const records = await prisma.onBoarding.findMany({
      take,
      skip,
      where,
      include: { client: true }, // include client info
    });

    const total = await prisma.onBoarding.count({ where });

    return res.status(200).json({
      message: 'OnBoardings retrieved successfully',
      data: records,
      pagination: { limit: take, page: parseInt(page) || 1, total },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// Create OnBoarding
const createOnBoarding = async (req, res) => {
  const {
    clientName,
    accountErrorMessage,
    bankAccountStatusMsg,
    reason,
    clientId,
  } = req.body;
  try {
    const newRecord = await prisma.onBoarding.create({
      data: {
        clientName,
        accountErrorMessage,
        bankAccountStatusMsg,
        reason,
        clientId: clientId,
      },
    });
    return res
      .status(201)
      .json({ message: 'OnBoarding created successfully', data: newRecord });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// Update OnBoarding
const updateOnBoarding = async (req, res) => {
  const { id } = req.params;
  const data = {};

  [
    'clientName',
    'accountErrorMessage',
    'bankAccountStatusMsg',
    'reason',
  ].forEach((field) => {
    if (req.body[field] !== undefined) data[field] = req.body[field];
  });

  try {
    const record = await prisma.onBoarding.findUnique({
      where: { id: parseInt(id) },
    });
    if (!record)
      return res.status(404).json({ message: 'OnBoarding not found' });

    const updatedRecord = await prisma.onBoarding.update({
      where: { id: parseInt(id) },
      data,
    });
    return res.status(200).json({
      message: 'OnBoarding updated successfully',
      data: updatedRecord,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// Delete OnBoarding
const deleteOnBoarding = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await prisma.onBoarding.findUnique({
      where: { id: parseInt(id) },
    });
    if (!record)
      return res.status(404).json({ message: 'OnBoarding not found' });

    await prisma.onBoarding.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: 'OnBoarding deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

export {
  getOnBoardingById,
  getAllOnBoardings,
  createOnBoarding,
  updateOnBoarding,
  deleteOnBoarding,
};
