import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { connectDB } from './src/config/db.js';

// Cron jobs
import './src/jobs/cleanupOTP.js';

// Import routes
import adminAuth from './src/routes/adminAuth.js';
import clientAuth from './src/routes/client/clientAuthRoute.js';

// Admin Routes
import transactionRoutes from './src/routes/transactionRoute.js';
import accountRoutes from './src/routes/accounts.js';
import kycRoutes from './src/routes/kycRoute.js';
import onboardingRoutes from './src/routes/onboardingRoute.js';
import vaRoutes from './src/routes/vaController.js';
import clientRoute from './src/routes/clientRoute.js';
import applicationRoute from './src/routes/application.js';
import currencyRoute from './src/routes/currency.js';
import adminCreateRoute from './src/routes/adminCreateRoute.js';
import { protect } from './src/middleware/auth.js';

// Client Routes
import clientTransactionRoutes from './src/routes/client/transactions.js';
import clientAccountRoutes from './src/routes/client/acounts.js';
import clientApplicationRoutes from './src/routes/client/applications.js';
import clientKycRoutes from './src/routes/client/kyc.js';
import clientCurrencyRoute from './src/routes/client/currency.js';
import clientUpload from './src/routes/client/upload.js';

// Initialize express app
const app = express();

app.use(
  cors({
    origin: [
      process.env.SUPER_ADMIN_URL,
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Auth routes
app.use('/api/auth', adminAuth);
app.use('/api/user', clientAuth);

// Client Routes
app.use('/api/transaction', clientTransactionRoutes);
app.use('/api/account', clientAccountRoutes);
app.use('/api/application', clientApplicationRoutes);
app.use('/api/kyc', clientKycRoutes);
app.use('/api/currency', clientCurrencyRoute);
app.use('/api/upload', clientUpload);

// Admin Routes (Protected)
app.use(protect);
app.use('/admin/admin-route', adminCreateRoute);
app.use('/admin/transaction', transactionRoutes);
app.use('/admin/account', accountRoutes);
app.use('/admin/kyc', kycRoutes);
app.use('/admin/onboarding', onboardingRoutes);
app.use('/admin/va', vaRoutes);
app.use('/admin/client', clientRoute);
app.use('/admin/application', applicationRoute);
app.use('/admin/currency', currencyRoute);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});

export default app;
