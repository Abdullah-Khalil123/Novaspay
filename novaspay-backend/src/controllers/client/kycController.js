import prisma from '../../../prisma/client.js';

const createOrUpdateClientKYC = async (req, res) => {
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
    // Find client and their existing KYC (if any)
    const client = await prisma.client.findUnique({
      where: { id: req.user.id },
      include: { kyc: true },
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    let kycRecord;

    // If KYC exists, update it
    if (client?.kyc?.id) {
      kycRecord = await prisma.kYC.update({
        where: { id: client.kyc.id },
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
        },
      });

      return res.status(200).json({
        message: 'KYC updated successfully',
        data: kycRecord,
      });
    }

    // If no KYC exists, create one and link it
    kycRecord = await prisma.kyc.create({
      data: {
        firstName,
        middleName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
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
      },
    });

    await prisma.client.update({
      where: { id: req.user.id },
      data: { kycId: kycRecord.id },
    });

    return res.status(201).json({
      message: 'KYC created successfully',
      data: kycRecord,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

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
    return res.status(200).json({ message: 'KYC retrieved', data: kyc });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

export { createOrUpdateClientKYC, getClientKYC };
