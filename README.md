# API Error Handling System

## Overview

This project implements a comprehensive class-based error handling system with consistent API responses.

## Architecture

### Error Classes

All errors extend from `ApiError` base class:

- **ApiError** - Base error class
- **BadRequestError** (400) - Invalid client request
- **UnauthorizedError** (401) - Authentication required
- **ForbiddenError** (403) - Insufficient permissions
- **NotFoundError** (404) - Resource not found
- **ConflictError** (409) - Resource conflict (e.g., duplicate)
- **ValidationError** (422) - Validation failed
- **InternalServerError** (500) - Server error
- **DatabaseError** (500) - Database operation failed

### Response Structure

All API responses follow this consistent structure:

```json
{
  "success": true/false,
  "statusCode": 200,
  "message": "Success message",
  "data": { /* your data */ },
  "errors": [ /* validation errors if any */ ],
  "timestamp": "2026-02-04T12:00:00.000Z",
  "path": "/api/endpoint"
}
```

### Middleware

1. **errorHandler** - Global error handler (catches all errors)
2. **notFoundHandler** - Handles 404 routes
3. **asyncHandler** - Wraps async functions to catch errors

## Usage Examples

### In Controllers

```typescript
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/index.js';
import { asyncHandler } from '../middleware/index.js';
import { NotFoundError, ValidationError } from '../error/index.js';

export class UserController {
  // Success response
  static getUsers = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await userService.getAll();
      return ApiResponse.success(res, 200, 'Users retrieved', users);
    }
  );

  // Error handling
  static getUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await userService.getById(req.params.id);
      
      if (!user) {
        throw new NotFoundError('User not found');
      }
      
      return ApiResponse.success(res, 200, 'User found', user);
    }
  );

  // Validation example
  static createUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, name } = req.body;
      
      if (!email || !name) {
        throw new ValidationError('Validation failed', [
          { field: 'email', message: 'Email is required' },
          { field: 'name', message: 'Name is required' }
        ]);
      }
      
      const user = await userService.create({ email, name });
      return ApiResponse.created(res, 'User created', user);
    }
  );
}
```

### API Response Methods

```typescript
// Success (200)
ApiResponse.success(res, 200, 'Success message', data);

// Created (201)
ApiResponse.created(res, 'Resource created', data);

// No Content (204)
ApiResponse.noContent(res);

// Error (custom status)
ApiResponse.error(res, 400, 'Error message', errors, path);
```

## Test Endpoints

Run the server and test these endpoints:

```bash
# Success response
GET http://localhost:5200/api/example/success

# Create with validation
POST http://localhost:5200/api/example/create
Body: { "name": "Test" }

# Not found error
GET http://localhost:5200/api/example/not-found/123

# Bad request error
GET http://localhost:5200/api/example/error

# Unexpected error
GET http://localhost:5200/api/example/unexpected

# Health check
GET http://localhost:5200/health

# 404 route
GET http://localhost:5200/api/nonexistent
```

## Environment Variables

Create a `.env` file:

```env
NODE_ENV=development
PORT=5200
```

## Running the Project

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Type check
npm run typecheck
```

## Next Steps

1. Add your own routes in `/src/routes`
2. Create controllers in `/src/controllers`
3. Use the error classes whenever you need to throw errors
4. All errors will be automatically caught and formatted consistently
