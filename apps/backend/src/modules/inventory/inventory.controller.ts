import { Request, Response } from 'express';
import { InventoryService } from './inventory.service.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ProductCategory } from '@dream-decorators/database';

export class InventoryController {
  static listProducts = asyncHandler(async (req: Request, res: Response) => {
    const { category, search, isActive, page, limit } = req.query;
    const result = await InventoryService.listProducts({
      category: category as ProductCategory | undefined,
      search: search as string | undefined,
      isActive: isActive !== undefined ? isActive === 'true' : undefined,
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    });
    return ApiResponse.success(res, 'Products retrieved successfully', result.products, result.pagination);
  });

  static getProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await InventoryService.getProductById(req.params.id);
    return ApiResponse.success(res, 'Product details retrieved successfully', product);
  });

  static createProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await InventoryService.createProduct(req.body);
    return ApiResponse.created(res, 'Product created successfully', product);
  });

  static updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await InventoryService.updateProduct(req.params.id, req.body);
    return ApiResponse.success(res, 'Product updated successfully', product);
  });

  static listWarehouses = asyncHandler(async (_req: Request, res: Response) => {
    const warehouses = await InventoryService.listWarehouses();
    return ApiResponse.success(res, 'Warehouses retrieved successfully', warehouses);
  });

  static adjustStock = asyncHandler(async (req: Request, res: Response) => {
    const result = await InventoryService.adjustStock(req.body);
    return ApiResponse.success(res, 'Stock adjustment recorded successfully', result);
  });

  static getLowStock = asyncHandler(async (_req: Request, res: Response) => {
    const items = await InventoryService.getLowStockAlerts();
    return ApiResponse.success(res, 'Low stock alerts retrieved successfully', items);
  });
}
