import { Router } from 'express';
import { getTemplateItems, createTemplateItem } from './template.controller.js';
import { validateRequest } from '../../middlewares/validate.middleware.js';
import { createFeatureSchema } from './template.schema.js';

const router = Router();

router.get('/', getTemplateItems);
router.post('/', validateRequest(createFeatureSchema), createTemplateItem);

export default router;
