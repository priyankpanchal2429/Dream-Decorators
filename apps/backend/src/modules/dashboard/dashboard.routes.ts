import { Router } from 'express';
import { DashboardController } from './dashboard.controller.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/stats', DashboardController.getStats);
router.get('/trends', DashboardController.getTrends);

export default router;
