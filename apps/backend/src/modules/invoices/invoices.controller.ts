import { Request, Response } from 'express';
import { InvoicesService } from './invoices.service.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { DocumentStatus, PaymentStatus } from '@dream-decorators/database';

export class InvoicesController {
  static list = asyncHandler(async (req: Request, res: Response) => {
    const { status, paymentStatus, partyId, financialYearId, search, page, limit } = req.query;
    const result = await InvoicesService.listInvoices({
      status: status as DocumentStatus | undefined,
      paymentStatus: paymentStatus as PaymentStatus | undefined,
      partyId: partyId as string | undefined,
      financialYearId: financialYearId as string | undefined,
      search: search as string | undefined,
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    });
    return ApiResponse.success(res, 'Invoices retrieved successfully', result.invoices, result.pagination);
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const invoice = await InvoicesService.getInvoiceById(req.params.id);
    return ApiResponse.success(res, 'Invoice retrieved successfully', invoice);
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const createdById = req.user!.userId;
    const invoice = await InvoicesService.createInvoice(req.body, createdById);
    return ApiResponse.created(res, 'Invoice created successfully', invoice);
  });
}
