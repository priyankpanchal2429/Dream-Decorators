import { Router } from 'express';
import { PartiesController } from './parties.controller.js';
import { validateRequest } from '../../middlewares/validate.middleware.js';
import { createPartySchema, updatePartySchema } from './parties.schema.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/', PartiesController.list);
router.get('/:id', PartiesController.getById);
router.post('/', validateRequest(createPartySchema), PartiesController.create);
router.put('/:id', validateRequest(updatePartySchema), PartiesController.update);
router.delete('/:id', PartiesController.delete);

export default router;
