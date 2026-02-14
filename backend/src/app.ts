import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://private-knowledge-q-a-frontend.onrender.com'],
  }),
);
app.use(express.json());

app.use('/api', routes);

// global error handler
app.use(errorMiddleware);

export default app;
