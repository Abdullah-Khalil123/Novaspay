import prisma from '../../prisma/client.js';

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
  try {
    const clients = await prisma.client.findMany();
    return res
      .status(200)
      .json({ message: 'Clients retrieved successfully', data: clients });
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

export {
  getClientById,
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
};
