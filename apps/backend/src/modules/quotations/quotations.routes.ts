import { Router } from 'express';
import { QuotationsController } from './quotations.controller.js';
import { validateRequest } from '../../middlewares/validate.middleware.js';
import { createQuotationSchema, updateQuotationStatusSchema } from './quotations.schema.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/', QuotationsController.list);
router.get('/:id', QuotationsController.getById);
router.post('/', validateRequest(createQuotationSchema), QuotationsController.create);
router.patch('/:id/status', validateRequest(updateQuotationStatusSchema), QuotationsController.updateStatus);
router.post('/:id/convert-to-invoice', QuotationsController.convertToInvoice);

export default router;
