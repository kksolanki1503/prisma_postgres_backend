import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

/**
 * Global Error Handler Middleware
 * Catches all errors and sends consistent error responses
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  // Log error for debugging
  console.error('Error:', {
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Handle known API errors
  if (err instanceof ApiError) {
    return ApiResponse.error(
      res,
      err.statusCode,
      err.message,
      err.errors,
      req.path
    );
  }

  // Handle Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as any;
    let message = 'Database operation failed';
    let statusCode = 500;

    // Handle specific Prisma error codes
    switch (prismaError.code) {
      case 'P2002':
        message = `Unique constraint failed on ${prismaError.meta?.target}`;
        statusCode = 409;
        break;
      case 'P2025':
        message = 'Record not found';
        statusCode = 404;
        break;
      case 'P2003':
        message = 'Foreign key constraint failed';
        statusCode = 400;
        break;
      default:
        message = prismaError.message || message;
    }

    return ApiResponse.error(res, statusCode, message, undefined, req.path);
  }

  // Handle validation errors (e.g., from express-validator)
  if (err.name === 'ValidationError') {
    return ApiResponse.error(res, 422, err.message, undefined, req.path);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.error(res, 401, 'Invalid token', undefined, req.path);
  }

  if (err.name === 'TokenExpiredError') {
    return ApiResponse.error(res, 401, 'Token expired', undefined, req.path);
  }

  // Handle unknown errors
  const statusCode = 500;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message || 'Something went wrong';

  return ApiResponse.error(
    res,
    statusCode,
    message,
    process.env.NODE_ENV === 'development' ? [{ stack: err.stack }] : undefined,
    req.path
  );
};
