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
  const { limit, page, email, name, status, userId } = req.query;

  try {
    const take = parseInt(limit) || 10;
    const skip = ((parseInt(page) || 1) - 1) * take;

    // Base filters
    const where = {
      email: email ? { contains: email } : undefined,
      firstName: name ? { contains: name } : undefined,
      status: status ? { equals: status } : undefined,
    };

    // Role-based filtering
    if (req.user.role === 'ADMIN') {
      // Only KYCs of clients invited by this admin
      where.client = {
        invitedBy: {
          inviterId: req.user.id,
        },
      };
    } else if (userId) {
      // Filter by clientId for SUPER_ADMIN
      where.clientId = parseInt(userId);
    }

    const kycs = await prisma.kYC.findMany({
      take,
      skip,
      where,
      include: { client: true }, // optional: include client info
    });

    const total = await prisma.kYC.count({ where });

    return res.status(200).json({
      message: 'KYC records retrieved successfully',
      data: kycs,
      pagination: { limit: take, page: parseInt(page) || 1, total },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const createKYC = async (req, res) => {
  const {
    email,
    type,
    name,
    phone,
    agentId,
    status,
    reason,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    contactNumber,
    address,
    city,
    state,
    postalCode,
    country,
    companyStreet,
    companyCity,
    headquaters,
    area,
    clientId,
  } = req.body;
  try {
    const newKYC = await prisma.kYC.create({
      data: {
        email,
        type,
        name,
        phone,
        agentId,
        status,
        reason,
        clientId: clientId ? clientId : null,
        firstName,
        middleName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        contactNumber,
        address,
        city,
        state,
        postalCode,
        country,
        companyStreet,
        companyCity,
        headquaters,
        area,
      },
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

  [
    'email',
    'type',
    'name',
    'phone',
    'agentId',
    'status',
    'reason',
    'firstName',
    'middleName',
    'lastName',
    'dateOfBirth',
    'contactNumber',
    'address',
    'city',
    'state',
    'postalCode',
    'country',
    'companyStreet',
    'companyCity',
    'headquaters',
    'area',
    'clientId',
  ].forEach((field) => {
    if (req.body[field] !== undefined) {
      if (field === 'dateOfBirth') {
        data[field] = new Date(req.body[field]);
      } else {
        data[field] = req.body[field];
      }
    }
  });

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
