import jwt from 'jsonwebtoken';
import prisma from '../../prisma/client.js';

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  let lang = req.headers['accept-language'] || 'en';
  if (lang) {
    req.lang = lang.split(',')[0]; // Set the language preference
  } else {
    req.lang = 'en'; // Default to English
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
      };

      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'Not authorized, user not found' });
      }
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Not authorized, token failed',
        error: error.message,
      });
    }
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  };
};
