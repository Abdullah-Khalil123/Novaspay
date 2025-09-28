import prisma from '../../prisma/client.js'; // Adjust the path as necessary

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.info('Postgres DB connected via Prisma');
  } catch (error) {
    console.error('DB connection failed', error);
    process.exit(1);
  }
};
