import { Router } from 'express';
import { ExampleController } from '../controllers/example.controller.js';

const router = Router();

/**
 * Example Routes
 * Demonstrates different response types
 */

// Success response
router.get('/success', ExampleController.getExample);

// Create with validation
router.post('/create', ExampleController.createExample);

// Not found error
router.get('/not-found/:id', ExampleController.getNotFound);

// Bad request error
router.get('/error', ExampleController.throwError);

// Unexpected error
router.get('/unexpected', ExampleController.throwUnexpectedError);

export default router;
