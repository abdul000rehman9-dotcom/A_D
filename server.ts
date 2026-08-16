import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { createExpressApp } from './backend/src/app.js';
import { connectDatabase } from './backend/src/config/database.js';

dotenv.config();

async function startServer() {
  // Connect to MongoDB Atlas (if MONGODB_URI is provided)
  await connectDatabase();

  // Create the Express backend application with all API routes mounted
  const app = createExpressApp();
  const PORT = 3000;

  // Vite middleware for development / static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Full-Stack Server] App and API running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('[Server Startup Error]', error);
});
