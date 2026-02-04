import { ApiError } from './ApiError.js';

/**
 * 409 - Conflict Error
 * Used when a request conflicts with current state (e.g., duplicate entry)
 */
export class ConflictError extends ApiError {
  constructor(message: string = 'Conflict - Resource already exists') {
    super(409, message, true);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
