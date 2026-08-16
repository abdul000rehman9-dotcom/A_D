import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { authRoutes } from './routes/authRoutes.js';
import { adminRoutes } from './routes/adminRoutes.js';
import { submissionRoutes } from './routes/submissionRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { getDatabaseState } from './config/database.js';

export function createExpressApp(): express.Application {
  const app = express();

  // Security headers (keep CSP relaxed to work with Vite SPA)
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );

  // CORS
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  // Parsers
  app.use(cookieParser());
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));

  // API Health & Status
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date(),
      database: getDatabaseState(),
    });
  });

  // Backend API Routing
  app.use('/api/auth', authRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/form-submissions', submissionRoutes);

  // Global error handler
  app.use(errorHandler);

  return app;
}
