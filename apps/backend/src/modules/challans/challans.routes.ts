import { Router } from 'express';
import { ChallansController } from './challans.controller.js';
import { validateRequest } from '../../middlewares/validate.middleware.js';
import { createChallanSchema } from './challans.schema.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/', ChallansController.list);
router.get('/:id', ChallansController.getById);
router.post('/', validateRequest(createChallanSchema), ChallansController.create);

export default router;
