import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/config/db.js';

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
import { protect } from './src/middleware/auth.js';

// Client Routes
import clientTransactionRoutes from './src/routes/client/transactions.js';
import clientAccountRoutes from './src/routes/client/acounts.js';

// Initialize express app
const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:4000',
      'http://localhost:3157',
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// app.use(setLanguage);

// Auth routes
app.use('/api/auth', adminAuth);
app.use('/api/user', clientAuth);

// Client Routes
app.use('/api/transaction', clientTransactionRoutes);
app.use('/api/account', clientAccountRoutes);

// Admin Routes (Protected)
app.use(protect);
app.use('/admin/transaction', transactionRoutes);
app.use('/admin/account', accountRoutes);
app.use('/admin/kyc', kycRoutes);
app.use('/admin/onboarding', onboardingRoutes);
app.use('/admin/va', vaRoutes);
app.use('/admin/client', clientRoute);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});

export default app;
