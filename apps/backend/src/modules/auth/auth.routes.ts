import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { validateRequest } from '../../middlewares/validate.middleware.js';
import { loginSchema, registerUserSchema } from './auth.schema.js';
import { authenticateJwt, requireRoles } from '../../middlewares/auth.middleware.js';
import { UserRole } from '@dream-decorators/database';

const router = Router();

router.post('/login', validateRequest(loginSchema), AuthController.login);
router.get('/me', authenticateJwt, AuthController.getProfile);
router.post(
  '/register',
  authenticateJwt,
  requireRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(registerUserSchema),
  AuthController.register
);

export default router;
