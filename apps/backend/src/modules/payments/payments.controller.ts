import { Request, Response } from 'express';
import { PaymentsService } from './payments.service.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export class PaymentsController {
  static list = asyncHandler(async (req: Request, res: Response) => {
    const { partyId, financialYearId, search, page, limit } = req.query;
    const result = await PaymentsService.listPayments({
      partyId: partyId as string | undefined,
      financialYearId: financialYearId as string | undefined,
      search: search as string | undefined,
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    });
    return ApiResponse.success(res, 'Payments retrieved successfully', result.payments, result.pagination);
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const payment = await PaymentsService.getPaymentById(req.params.id);
    return ApiResponse.success(res, 'Payment voucher retrieved successfully', payment);
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const createdById = req.user!.userId;
    const payment = await PaymentsService.createPayment(req.body, createdById);
    return ApiResponse.created(res, 'Payment voucher recorded successfully', payment);
  });
}
