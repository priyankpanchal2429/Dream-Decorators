import { Router } from 'express';
import { InventoryController } from './inventory.controller.js';
import { validateRequest } from '../../middlewares/validate.middleware.js';
import { createProductSchema, updateProductSchema, stockAdjustmentSchema } from './inventory.schema.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/products', InventoryController.listProducts);
router.get('/products/low-stock', InventoryController.getLowStock);
router.get('/products/:id', InventoryController.getProductById);
router.post('/products', validateRequest(createProductSchema), InventoryController.createProduct);
router.put('/products/:id', validateRequest(updateProductSchema), InventoryController.updateProduct);

router.get('/warehouses', InventoryController.listWarehouses);
router.post('/stock-adjust', validateRequest(stockAdjustmentSchema), InventoryController.adjustStock);

export default router;
