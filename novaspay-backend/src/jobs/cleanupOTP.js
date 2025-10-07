import cron from 'node-cron';
import prisma from '../../prisma/client.js';

console.log('OTP cleanup job initialized');
// Schedule a job to run every hour to clean up expired OTPs
cron.schedule('0 * * * *', async () => {
  try {
    const result = await prisma.emailVerification.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
    if (result.count > 0) {
      console.log(
        `[CLEANUP] Deleted ${
          result.count
        } expired OTPs at ${new Date().toISOString()}`
      );
    }
  } catch (error) {
    console.error('[CLEANUP ERROR]', error.message);
  }
});
