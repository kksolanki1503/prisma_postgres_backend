import { ApiError } from './ApiError.js';

/**
 * 422 - Validation Error
 * Used when request validation fails
 */
export class ValidationError extends ApiError {
  constructor(message: string = 'Validation failed', errors?: any[]) {
    super(422, message, true, errors);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
