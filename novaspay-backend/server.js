import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/config/db.js';
import { setLanguage } from './src/middleware/language.js';

// Import routes
import userRoutes from './src/routes/userRoute.js';
import gameRoute from './src/routes/gamesRoute.js';
import serviceRoute from './src/routes/serviceRoute.js';
import categoryRoute from './src/routes/categoryRoute.js';
import orderRoute from './src/routes/orderRoute.js';
import newsRoute from './src/routes/newsRoute.js';
import currencyRoute from './src/routes/currencyConfigRoute.js';

// Initialize express app
const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
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
app.use(setLanguage);

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/game', gameRoute);
app.use('/api/service', serviceRoute);
app.use('/api/category', categoryRoute);
app.use('/api/order', orderRoute);
app.use('/api/news', newsRoute);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});

export default app;
