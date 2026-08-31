import { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export class AuthController {
  static login = asyncHandler(async (req: Request, res: Response) => {
    const { loginId, password } = req.body;
    const result = await AuthService.login(loginId, password);
    return ApiResponse.success(res, 'Login successful', result);
  });

  static signup = asyncHandler(async (req: Request, res: Response) => {
    const result = await AuthService.signup(req.body);
    return ApiResponse.created(res, 'Account created successfully', result);
  });

  static forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { loginId, newPassword } = req.body;
    const result = await AuthService.forgotPassword(loginId, newPassword);
    return ApiResponse.success(res, result.message, result);
  });

  static getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const user = await AuthService.getCurrentUser(userId);
    return ApiResponse.success(res, 'User profile fetched successfully', user);
  });
}
