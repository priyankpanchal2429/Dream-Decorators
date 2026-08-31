import { Request, Response } from 'express';
import { ChallansService } from './challans.service.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { DocumentStatus } from '@dream-decorators/database';

export class ChallansController {
  static list = asyncHandler(async (req: Request, res: Response) => {
    const { status, partyId, warehouseId, financialYearId, search, page, limit } = req.query;
    const result = await ChallansService.listChallans({
      status: status as DocumentStatus | undefined,
      partyId: partyId as string | undefined,
      warehouseId: warehouseId as string | undefined,
      financialYearId: financialYearId as string | undefined,
      search: search as string | undefined,
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    });
    return ApiResponse.success(res, 'Delivery challans retrieved successfully', result.challans, result.pagination);
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const challan = await ChallansService.getChallanById(req.params.id);
    return ApiResponse.success(res, 'Challan details retrieved successfully', challan);
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const createdById = req.user!.userId;
    const challan = await ChallansService.createChallan(req.body, createdById);
    return ApiResponse.created(res, 'Delivery challan created and stock deducted', challan);
  });
}
