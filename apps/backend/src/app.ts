import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.config.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { ApiResponse } from './utils/ApiResponse.js';
import apiRouter from './routes/index.js';

export const createApp = () => {
  const app = express();

  // Security & Utility Middlewares
  app.use(helmet());
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        if (
          origin === env.FRONTEND_URL ||
          origin.startsWith('http://localhost') ||
          origin.startsWith('http://127.0.0.1')
        ) {
          return callback(null, true);
        }
        return callback(null, true); // Permissive in dev/staging; can be locked down with env
      },
      credentials: true,
    })
  );
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health Check Endpoint
  app.get('/health', (_req: Request, res: Response) => {
    return ApiResponse.success(res, 'Dream Decorators ERP API is running healthy', {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
    });
  });

  // Centralized Enterprise API Router
  app.use('/api/v1', apiRouter);

  // Fallback 404 Route
  app.use((_req: Request, res: Response) => {
    return ApiResponse.error(res, 'Requested route not found', 404);
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
};
