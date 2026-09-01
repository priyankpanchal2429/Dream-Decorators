import { Request, Response } from 'express';
import { QuotationsService } from './quotations.service.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { DocumentStatus } from '@dream-decorators/database';

export class QuotationsController {
  static list = asyncHandler(async (req: Request, res: Response) => {
    const { status, partyId, financialYearId, search, page, limit } = req.query;
    const result = await QuotationsService.listQuotations({
      status: status as DocumentStatus | undefined,
      partyId: partyId as string | undefined,
      financialYearId: financialYearId as string | undefined,
      search: search as string | undefined,
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    });
    return ApiResponse.success(res, 'Quotations retrieved successfully', result.quotations, result.pagination);
  });

  static getStats = asyncHandler(async (req: Request, res: Response) => {
    const { financialYearId } = req.query;
    const stats = await QuotationsService.getQuotationStats(financialYearId as string | undefined);
    return ApiResponse.success(res, 'Quotation statistics retrieved successfully', stats);
  });

  static getNextNumber = asyncHandler(async (req: Request, res: Response) => {
    const { financialYearId } = req.query;
    const nextNumber = await QuotationsService.getNextNumber(financialYearId as string | undefined);
    return ApiResponse.success(res, 'Next quotation number generated', nextNumber);
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const quotation = await QuotationsService.getQuotationById(req.params.id);
    return ApiResponse.success(res, 'Quotation retrieved successfully', quotation);
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const createdById = req.user!.userId;
    const quotation = await QuotationsService.createQuotation(req.body, createdById);
    return ApiResponse.created(res, 'Quotation created successfully', quotation);
  });

  static updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const quotation = await QuotationsService.updateStatus(req.params.id, req.body.status);
    return ApiResponse.success(res, 'Quotation status updated successfully', quotation);
  });

  static convertToInvoice = asyncHandler(async (req: Request, res: Response) => {
    const createdById = req.user!.userId;
    const { invoiceNumber } = req.body;
    const invoice = await QuotationsService.convertToInvoice(req.params.id, invoiceNumber, createdById);
    return ApiResponse.created(res, 'Quotation successfully converted to Invoice', invoice);
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const result = await QuotationsService.deleteQuotation(req.params.id);
    return ApiResponse.success(res, result.message, result);
  });
}
