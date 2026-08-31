import { Request, Response } from 'express';
import { PurchasesService } from './purchases.service.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { PaymentStatus } from '@dream-decorators/database';

export class PurchasesController {
  static list = asyncHandler(async (req: Request, res: Response) => {
    const { paymentStatus, partyId, financialYearId, search, page, limit } = req.query;
    const result = await PurchasesService.listPurchases({
      paymentStatus: paymentStatus as PaymentStatus | undefined,
      partyId: partyId as string | undefined,
      financialYearId: financialYearId as string | undefined,
      search: search as string | undefined,
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    });
    return ApiResponse.success(res, 'Purchases retrieved successfully', result.purchases, result.pagination);
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const purchase = await PurchasesService.getPurchaseById(req.params.id);
    return ApiResponse.success(res, 'Purchase details retrieved successfully', purchase);
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const createdById = req.user!.userId;
    const purchase = await PurchasesService.createPurchase(req.body, createdById);
    return ApiResponse.created(res, 'Purchase invoice created and stock updated', purchase);
  });
}
