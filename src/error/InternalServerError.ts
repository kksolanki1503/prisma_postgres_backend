import { ApiError } from './ApiError.js';

/**
 * 500 - Internal Server Error
 * Used for unexpected server errors
 */
export class InternalServerError extends ApiError {
  constructor(message: string = 'Internal Server Error') {
    super(500, message, false);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
