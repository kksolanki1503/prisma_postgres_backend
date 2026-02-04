import type { Response } from 'express';

/**
 * Standard API Response Structure
 */
export interface IApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T | undefined;
  errors?: any[] | undefined;
  timestamp: string;
  path?: string | undefined;
}

/**
 * API Response Handler Class
 * Provides consistent response structure across the application
 */
export class ApiResponse {
  /**
   * Send success response
   */
  static success<T>(
    res: Response,
    statusCode: number = 200,
    message: string = 'Success',
    data?: T
  ): Response<IApiResponse<T>> {
    const response: IApiResponse<T> = {
      success: true,
      statusCode,
      message,
      data,
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Send error response
   */
  static error(
    res: Response,
    statusCode: number = 500,
    message: string = 'Error',
    errors?: any[],
    path?: string
  ): Response<IApiResponse> {
    const response: IApiResponse = {
      success: false,
      statusCode,
      message,
      errors,
      timestamp: new Date().toISOString(),
      path,
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Send created response (201)
   */
  static created<T>(
    res: Response,
    message: string = 'Resource created successfully',
    data?: T
  ): Response<IApiResponse<T>> {
    return this.success(res, 201, message, data);
  }

  /**
   * Send no content response (204)
   */
  static noContent(res: Response): Response {
    return res.status(204).send();
  }
}
