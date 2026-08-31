import { Request, Response } from 'express';
import { SettingsService } from './settings.service.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export class SettingsController {
  static listFY = asyncHandler(async (_req: Request, res: Response) => {
    const list = await SettingsService.listFinancialYears();
    return ApiResponse.success(res, 'Financial years retrieved successfully', list);
  });

  static getCurrentFY = asyncHandler(async (_req: Request, res: Response) => {
    const current = await SettingsService.getCurrentFinancialYear();
    return ApiResponse.success(res, 'Current financial year retrieved successfully', current);
  });

  static createFY = asyncHandler(async (req: Request, res: Response) => {
    const created = await SettingsService.createFinancialYear(req.body);
    return ApiResponse.created(res, 'Financial year created successfully', created);
  });

  static setCurrentFY = asyncHandler(async (req: Request, res: Response) => {
    const updated = await SettingsService.setCurrentFinancialYear(req.params.id);
    return ApiResponse.success(res, 'Active financial year updated successfully', updated);
  });
}
