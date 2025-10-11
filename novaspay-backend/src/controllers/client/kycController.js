import prisma from '../../../prisma/client.js';

const getClientKYC = async (req, res) => {
  try {
    const kyc = await prisma.kYC.findUnique({
      where: {
        clientId: req.user.id,
      },
    });

    if (!kyc) {
      return res.status(404).json({ message: 'KYC not found' });
    }

    return res.status(200).json({
      message: 'KYC retrieved successfully',
      data: kyc,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const createClientKYC = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    email,
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
    frontFacingImage,
    backFacingImage,
  } = req.body;

  try {
    // Check if KYC already exists
    const existingKYC = await prisma.kYC.findUnique({
      where: { clientId: req.user.id },
    });

    if (existingKYC) {
      return res.status(409).json({
        message: 'KYC already exists for this client',
      });
    }

    const kycRecord = await prisma.kYC.create({
      data: {
        firstName,
        middleName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        email,
        contactNumber,
        companyAddress: address,
        city,
        state,
        postalCode,
        companyCountry: country,
        companyStreet,
        companyCity,
        headquarters: headquaters,
        area,
        frontFacingImage,
        backFacingImage,
        client: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    return res.status(201).json({
      message: 'KYC created successfully',
      data: kycRecord,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const updateClientKYC = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    email,
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
    frontFacingImage,
    backFacingImage,
  } = req.body;

  try {
    // Check if KYC exists
    const existingKYC = await prisma.kYC.findUnique({
      where: { clientId: req.user.id },
    });

    if (!existingKYC) {
      return res.status(404).json({
        message: 'KYC not found',
      });
    }

    const kycRecord = await prisma.kYC.update({
      where: { clientId: req.user.id },
      data: {
        firstName,
        middleName,
        lastName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        email,
        contactNumber,
        companyAddress: address,
        city,
        state,
        postalCode,
        companyCountry: country,
        companyStreet,
        companyCity,
        headquarters: headquaters,
        area,
        frontFacingImage,
        backFacingImage,
      },
    });

    return res.status(200).json({
      message: 'KYC updated successfully',
      data: kycRecord,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

export { getClientKYC, createClientKYC, updateClientKYC };
