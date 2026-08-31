import { Request, Response } from 'express';
import { PartiesService } from './parties.service.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { PartyType } from '@dream-decorators/database';

export class PartiesController {
  static list = asyncHandler(async (req: Request, res: Response) => {
    const { type, search, isActive, page, limit } = req.query;
    const result = await PartiesService.listParties({
      type: type as PartyType | undefined,
      search: search as string | undefined,
      isActive: isActive !== undefined ? isActive === 'true' : undefined,
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    });
    return ApiResponse.success(res, 'Parties retrieved successfully', result.parties, result.pagination);
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const party = await PartiesService.getPartyById(req.params.id);
    return ApiResponse.success(res, 'Party details retrieved successfully', party);
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const party = await PartiesService.createParty(req.body);
    return ApiResponse.created(res, 'Party created successfully', party);
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const party = await PartiesService.updateParty(req.params.id, req.body);
    return ApiResponse.success(res, 'Party updated successfully', party);
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    await PartiesService.deleteParty(req.params.id);
    return ApiResponse.success(res, 'Party deleted/deactivated successfully');
  });
}
