import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.config.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { ApiResponse } from './utils/ApiResponse.js';

export const createApp = () => {
  const app = express();

  // Security & Utility Middlewares
  app.use(helmet());
  app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health Check Endpoint
  app.get('/health', (_req: Request, res: Response) => {
    return ApiResponse.success(res, 'Dream Decorators ERP API is running healthy', {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // Global Centralized Router placeholder
  // app.use('/api/v1', apiRouter);

  // Fallback 404 Route
  app.use((_req: Request, res: Response) => {
    return ApiResponse.error(res, 'Requested route not found', 404);
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
};
