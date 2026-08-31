import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { validateRequest } from '../../middlewares/validate.middleware.js';
import { loginSchema, signupSchema, forgotPasswordSchema } from './auth.schema.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', validateRequest(loginSchema), AuthController.login);
router.post('/signup', validateRequest(signupSchema), AuthController.signup);
router.post('/register', validateRequest(signupSchema), AuthController.signup);
router.post('/forgot-password', validateRequest(forgotPasswordSchema), AuthController.forgotPassword);
router.get('/me', authenticateJwt, AuthController.getProfile);

export default router;
