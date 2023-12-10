import express from 'express';
import rota from './routes/user.route';
import { httpErrorMiddleware } from './middleware/http.error.middleware';
const app = express();

app.use(express.json());

app.use(rota);

app.use(httpErrorMiddleware);

export default app;