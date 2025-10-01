import prisma from '../../prisma/client.js';

const getVAById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await prisma.vA.findUnique({ where: { id: parseInt(id) } });
    if (!record) return res.status(404).json({ message: 'VA not found' });
    return res
      .status(200)
      .json({ message: 'VA retrieved successfully', data: record });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const getAllVAs = async (req, res) => {
  const { limit, page } = req.query;
  try {
    const records = await prisma.vA.findMany({
      take: parseInt(limit) || 10,
      skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
    });
    return res.status(200).json({
      message: 'VAs retrieved successfully',
      data: records,
      pagination: {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
        total: await prisma.vA.count(),
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const createVA = async (req, res) => {
  const {
    purpose,
    currency,
    paymentMethod,
    headquaters,
    state,
    city,
    street,
    postalCode,
    businessCategory,
    region,
    fundingSource,
    storePhotos,
    declineReason,
    status,
  } = req.body;
  try {
    const newRecord = await prisma.vA.create({
      data: {
        purpose,
        currency,
        paymentMethod,
        headquaters,
        state,
        city,
        street,
        postalCode,
        businessCategory,
        region,
        fundingSource,
        storePhotos,
        declineReason,
        status,
      },
    });
    return res
      .status(201)
      .json({ message: 'VA created successfully', data: newRecord });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const updateVA = async (req, res) => {
  const { id } = req.params;
  const data = {};

  [
    'purpose',
    'currency',
    'paymentMethod',
    'headquaters',
    'state',
    'city',
    'street',
    'postalCode',
    'businessCategory',
    'region',
    'fundingSource',
    'storePhotos',
    'declineReason',
    'status',
  ].forEach((field) => {
    if (req.body[field] !== undefined) data[field] = req.body[field];
  });

  try {
    const record = await prisma.vA.findUnique({ where: { id: parseInt(id) } });
    if (!record) return res.status(404).json({ message: 'VA not found' });

    const updatedRecord = await prisma.vA.update({
      where: { id: parseInt(id) },
      data,
    });
    return res
      .status(200)
      .json({ message: 'VA updated successfully', data: updatedRecord });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const deleteVA = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await prisma.vA.findUnique({ where: { id: parseInt(id) } });
    if (!record) return res.status(404).json({ message: 'VA not found' });

    await prisma.vA.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: 'VA deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

export { getVAById, getAllVAs, createVA, updateVA, deleteVA };
