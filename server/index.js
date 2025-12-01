import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/auth.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * ==========================================
 * MIDDLEWARE
 * ==========================================
 */

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:8080',
      'http://localhost:8081', 
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:8080',
      'http://127.0.0.1:8081',
    ];
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600,
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Logging middleware
app.use(morgan('combined'));

// Request timeout
app.use((req, res, next) => {
  req.setTimeout(30000);
  res.setTimeout(30000);
  next();
});

/**
 * ==========================================
 * DATABASE CONNECTION
 * ==========================================
 */

connectDB();

/**
 * ==========================================
 * HEALTH CHECK ENDPOINT
 * ==========================================
 */

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AllCollegeEvents Server is running',
    timestamp: new Date().toISOString(),
  });
});

/**
 * ==========================================
 * API ROUTES
 * ==========================================
 */

app.use('/api/auth', authRoutes);

// Event routes
import eventRoutes from './routes/eventRoutes.js';
app.use('/api/events', eventRoutes);

/**
 * ==========================================
 * 404 HANDLER
 * ==========================================
 */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

/**
 * ==========================================
 * ERROR HANDLER (Must be last)
 * ==========================================
 */

app.use(errorHandler);

/**
 * ==========================================
 * START SERVER
 * ==========================================
 */

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   AllCollegeEvents Server Started      ║
║   🚀 Port: ${PORT}                        ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}         ║
║   📦 MongoDB: Connected                ║
╚════════════════════════════════════════╝
  `);
});

/**
 * Handle unhandled promise rejections
 */
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

/**
 * Handle uncaught exceptions
 */
process.on('uncaughtException', (err) => {
  console.error(`❌ Uncaught Exception: ${err.message}`);
  process.exit(1);
});

/**
 * Graceful shutdown
 */
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

export default app;
