import { Request, Response } from 'express';
import { DashboardService } from './dashboard.service.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export class DashboardController {
  static getStats = asyncHandler(async (req: Request, res: Response) => {
    const { financialYearId } = req.query;
    const stats = await DashboardService.getSummaryStats(financialYearId as string | undefined);
    return ApiResponse.success(res, 'Dashboard statistics retrieved successfully', stats);
  });

  static getTrends = asyncHandler(async (req: Request, res: Response) => {
    const { financialYearId } = req.query;
    const trends = await DashboardService.getMonthlyRevenueTrend(financialYearId as string | undefined);
    return ApiResponse.success(res, 'Revenue trend data retrieved successfully', trends);
  });
}
