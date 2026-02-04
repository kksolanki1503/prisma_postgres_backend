import { ApiError } from './ApiError.js';

/**
 * 404 - Not Found Error
 * Used when a requested resource is not found
 */
export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(404, message, true);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
