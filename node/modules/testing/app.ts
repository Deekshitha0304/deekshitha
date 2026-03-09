import express from 'express';
import { Pool } from 'pg';
import { randomUUID } from 'crypto';

export function createApp(pool: Pool) {
  const app = express();
  app.use(express.json());

  // request id middleware
  app.use((req: any, res, next) => {
    req.requestId = randomUUID();
    next();
  });

  app.get('/users/:id', async (req: any, res) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id=$1', [
        req.params.id,
      ]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          type: 'about:blank',
          title: 'Not Found',
          status: 404,
          detail: 'User not found',
        });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error('db error', { requestId: req.requestId });

      res.status(503).json({
        type: 'about:blank',
        title: 'Service Unavailable',
        status: 503,
        detail: 'database unavailable',
      });
    }
  });

  return app;
}
