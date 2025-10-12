import prisma from '../../prisma/client.js';
import generateAlphaNumericCode from '../utils/generateCode.js';

const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) },
    });
    if (!client) return res.status(404).json({ message: 'Client not found' });
    return res
      .status(200)
      .json({ message: 'Client retrieved successfully', data: client });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const getAllClients = async (req, res) => {
  const { limit, page, clientName, country, email, id } = req.query;

  try {
    const take = parseInt(limit) || 10;
    const skip = ((parseInt(page) || 1) - 1) * take;

    const where = {
      id: id ? parseInt(id) : undefined,
      name: clientName ? { contains: clientName } : undefined,
      country: country ? { contains: country } : undefined,
      email: email ? { contains: email } : undefined,
    };

    // Role-based filtering
    if (req.user.role === 'ADMIN') {
      // Only clients invited by this admin
      where.invitedBy = {
        inviterId: req.user.id,
      };
    }

    const clients = await prisma.client.findMany({
      take,
      skip,
      where,
      include: { invitedBy: true }, // optional: include invite info
    });

    const total = await prisma.client.count({ where });

    return res.status(200).json({
      message: 'Clients retrieved successfully',
      data: clients,
      pagination: { limit: take, page: parseInt(page) || 1, total },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const createClient = async (req, res) => {
  const {
    name,
    loginTime,
    type,
    country,
    email,
    agentName,
    bankAccountNumber,
    description,
    invitationCode,
    accountInfo,
  } = req.body;
  try {
    const newClient = await prisma.client.create({
      data: {
        name,
        loginTime,
        type,
        country,
        email,
        agentName,
        bankAccountNumber,
        description,
        invitationCode,
        accountInfo,
      },
    });
    return res
      .status(201)
      .json({ message: 'Client created successfully', data: newClient });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  const data = {};

  [
    'name',
    'loginTime',
    'type',
    'country',
    'email',
    'agentName',
    'bankAccountNumber',
    'description',
    'invitationCode',
    'accountInfo',
  ].forEach((field) => {
    if (req.body[field] !== undefined) data[field] = req.body[field];
  });

  try {
    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) },
    });
    if (!client) return res.status(404).json({ message: 'Client not found' });

    const updatedClient = await prisma.client.update({
      where: { id: parseInt(id) },
      data,
    });
    return res
      .status(200)
      .json({ message: 'Client updated successfully', data: updatedClient });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) },
    });
    if (!client) return res.status(404).json({ message: 'Client not found' });

    await prisma.client.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

const createInvite = async (req, res) => {
  const code = generateAlphaNumericCode();
  try {
    const newInvite = await prisma.invite.create({
      data: { code },
    });
    return res
      .status(201)
      .json({ message: 'Invite created successfully', data: newInvite });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

export {
  getClientById,
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
  createInvite,
};
