import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authRoutes } from './routes/authRoutes';
import { noteRoutes } from './routes/noteRoutes';
import { accountRoutes } from './routes/accountRoutes';

const app = new Hono();

app.use(cors({
  origin: 'http://localhost:5173',
  allowHeaders: ['Content-Type'],
  allowMethods: ['POST', 'GET', 'DELETE'],
  credentials: true
}));

authRoutes(app);

accountRoutes(app);

noteRoutes(app);

const port = 3000;
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
