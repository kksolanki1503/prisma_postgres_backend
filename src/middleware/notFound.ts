import type { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../error/index.js';

/**
 * 404 Not Found Middleware
 * Catches all requests to undefined routes
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new NotFoundError(`Route ${req.originalUrl} not found`);
  next(error);
};