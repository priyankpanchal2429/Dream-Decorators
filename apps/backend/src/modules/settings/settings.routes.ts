import { Router } from 'express';
import { SettingsController } from './settings.controller.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/financial-years', SettingsController.listFY);
router.get('/financial-years/current', SettingsController.getCurrentFY);
router.post('/financial-years', SettingsController.createFY);
router.post('/financial-years/:id/set-current', SettingsController.setCurrentFY);

export default router;
