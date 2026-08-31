import { Router } from 'express';
import { PaymentsController } from './payments.controller.js';
import { validateRequest } from '../../middlewares/validate.middleware.js';
import { createPaymentSchema } from './payments.schema.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/', PaymentsController.list);
router.get('/:id', PaymentsController.getById);
router.post('/', validateRequest(createPaymentSchema), PaymentsController.create);

export default router;
