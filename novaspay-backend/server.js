import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/config/db.js';

// Import routes
import userRoutes from './src/routes/userRoute.js';
import transactionRoutes from './src/routes/transactionRoute.js';

// Initialize express app
const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:4000',
      process.env.ADMIN_URL,
      process.env.ADMIN2_URL,
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// app.use(setLanguage);

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/transaction', transactionRoutes);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});

export default app;
