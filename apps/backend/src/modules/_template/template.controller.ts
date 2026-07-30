import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const getTemplateItems = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 'Template items fetched successfully', []);
});

export const createTemplateItem = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.created(res, 'Template item created successfully', req.body);
});
