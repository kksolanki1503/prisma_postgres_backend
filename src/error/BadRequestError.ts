import { ApiError } from './ApiError.js';

/**
 * 400 - Bad Request Error
 * Used when the client sends invalid data
 */
export class BadRequestError extends ApiError {
  constructor(message: string = 'Bad Request', errors?: any[]) {
    super(400, message, true, errors);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
