import { ApiError } from './ApiError.js';

/**
 * 401 - Unauthorized Error
 * Used when authentication is required and has failed or not been provided
 */
export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(401, message, true);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
