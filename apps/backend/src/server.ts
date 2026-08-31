import { createApp } from './app.js';
import { env } from './config/env.config.js';
import { logger } from './config/logger.config.js';

const app = createApp();

const PORT = Number(process.env.PORT) || env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
  logger.info(`🚀 Dream Decorators ERP Backend Server running on port ${PORT} in ${env.NODE_ENV} mode`);
});
