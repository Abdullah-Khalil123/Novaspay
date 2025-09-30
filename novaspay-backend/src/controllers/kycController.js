import prisma from '../../prisma/client.js';

const getKYCById = async (req, res) => {
  const { id } = req.params;
  try {
    const kyc = await prisma.kYC.findUnique({
      where: { id: parseInt(id) },
    });
    if (!kyc) {
      return res.status(404).json({ message: 'KYC record not found' });
    }
    return res.status(200).json({
      message: 'KYC record retrieved successfully',
      data: kyc,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const getAllKYCs = async (req, res) => {
  try {
    const kycs = await prisma.kYC.findMany();
    return res.status(200).json({
      message: 'KYC records retrieved successfully',
      data: kycs,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const createKYC = async (req, res) => {
  const { email, type, name, phone, agentId, status, reason } = req.body;
  try {
    const newKYC = await prisma.kYC.create({
      data: { email, type, name, phone, agentId, status, reason },
    });
    return res.status(201).json({
      message: 'KYC record created successfully',
      data: newKYC,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const updateKYC = async (req, res) => {
  const { id } = req.params;
  const data = {};

  ['email', 'type', 'name', 'phone', 'agentId', 'status', 'reason'].forEach(
    (field) => {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    }
  );

  try {
    const kyc = await prisma.kYC.findUnique({
      where: { id: parseInt(id) },
    });
    if (!kyc) {
      return res.status(404).json({ message: 'KYC record not found' });
    }
    const updatedKYC = await prisma.kYC.update({
      where: { id: parseInt(id) },
      data,
    });
    return res.status(200).json({
      message: 'KYC record updated successfully',
      data: updatedKYC,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const deleteKYC = async (req, res) => {
  const { id } = req.params;
  try {
    const kyc = await prisma.kYC.findUnique({
      where: { id: parseInt(id) },
    });
    if (!kyc) {
      return res.status(404).json({ message: 'KYC record not found' });
    }
    await prisma.kYC.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: 'KYC record deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

export { getKYCById, getAllKYCs, createKYC, updateKYC, deleteKYC };
