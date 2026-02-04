import { ApiError } from './ApiError.js';

/**
 * 500 - Database Error
 * Used for database-related errors
 */
export class DatabaseError extends ApiError {
  constructor(message: string = 'Database operation failed') {
    super(500, message, false);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
