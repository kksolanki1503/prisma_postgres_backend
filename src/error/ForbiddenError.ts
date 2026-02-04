import { ApiError } from './ApiError.js';

/**
 * 403 - Forbidden Error
 * Used when the user doesn't have permission to access a resource
 */
export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden - You do not have permission to access this resource') {
    super(403, message, true);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
