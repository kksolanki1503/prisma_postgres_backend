import express from 'express';
import { errorHandler, notFoundHandler } from './middleware/index.js';
import exampleRoutes from './routes/example.routes.js';

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Example routes (for demonstration)
app.use('/api/example', exampleRoutes);

// Your routes will go here
// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);

// 404 handler - must be after all routes
app.use(notFoundHandler);

// Global error handler - must be last
app.use(errorHandler);

const PORT = process.env.PORT || 5200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





