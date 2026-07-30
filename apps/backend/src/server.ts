import { createApp } from './app.js';
import { env } from './config/env.config.js';
import { logger } from './config/logger.config.js';

const app = createApp();

app.listen(env.PORT, () => {
  logger.info(`🚀 Dream Decorators ERP Backend Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});
