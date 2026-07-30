import { Response } from 'express';

export interface ApiResponsePayload<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, any>;
  errors?: any[];
}

export class ApiResponse {
  static success<T>(res: Response, message: string, data?: T, meta?: Record<string, any>, statusCode = 200) {
    const payload: ApiResponsePayload<T> = {
      success: true,
      message,
      ...(data !== undefined && { data }),
      ...(meta !== undefined && { meta }),
    };
    return res.status(statusCode).json(payload);
  }

  static created<T>(res: Response, message: string, data?: T) {
    return ApiResponse.success(res, message, data, undefined, 201);
  }

  static error(res: Response, message: string, statusCode = 500, errors: any[] = []) {
    const payload: ApiResponsePayload<null> = {
      success: false,
      message,
      ...(errors.length > 0 && { errors }),
    };
    return res.status(statusCode).json(payload);
  }
}
