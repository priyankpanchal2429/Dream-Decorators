import { Router } from 'express';
import { PurchasesController } from './purchases.controller.js';
import { validateRequest } from '../../middlewares/validate.middleware.js';
import { createPurchaseSchema } from './purchases.schema.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/', PurchasesController.list);
router.get('/:id', PurchasesController.getById);
router.post('/', validateRequest(createPurchaseSchema), PurchasesController.create);

export default router;
