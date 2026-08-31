import { Router } from 'express';
import { InvoicesController } from './invoices.controller.js';
import { validateRequest } from '../../middlewares/validate.middleware.js';
import { createInvoiceSchema } from './invoices.schema.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/', InvoicesController.list);
router.get('/:id', InvoicesController.getById);
router.post('/', validateRequest(createInvoiceSchema), InvoicesController.create);

export default router;
