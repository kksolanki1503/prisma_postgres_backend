import type { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/index.js';
import { asyncHandler } from '../middleware/index.js';
import { 
  BadRequestError, 
  NotFoundError, 
  ValidationError 
} from '../error/index.js';

/**
 * Example Controller Class
 * Demonstrates how to use the error handling system
 */
export class ExampleController {
  /**
   * Success example
   */
  static getExample = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = {
        id: 1,
        name: 'Example Data',
        description: 'This is an example of a successful response',
      };

      return ApiResponse.success(res, 200, 'Data retrieved successfully', data);
    }
  );

  /**
   * Create example
   */
  static createExample = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name } = req.body;

      // Validation example
      if (!name) {
        throw new ValidationError('Name is required', [
          { field: 'name', message: 'Name field is required' },
        ]);
      }

      const newData = {
        id: Date.now(),
        name,
        createdAt: new Date(),
      };

      return ApiResponse.created(res, 'Resource created successfully', newData);
    }
  );

  /**
   * Not found example
   */
  static getNotFound = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      
      // Simulate resource not found
      throw new NotFoundError(`Resource with id ${id} not found`);
    }
  );

  /**
   * Error example
   */
  static throwError = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // This will be caught by the global error handler
      throw new BadRequestError('This is a bad request error example');
    }
  );

  /**
   * Unexpected error example
   */
  static throwUnexpectedError = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // This will be caught as an unexpected error
      throw new Error('This is an unexpected error');
    }
  );
}
