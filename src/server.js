import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import router from './routers/index.js';
import { env } from './utils/env.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(env('PORT', '3000'));
const setupServer = () => {
  const app = express();

  const allowedOrigins = [
    'https://photo-gallery-react-iota.vercel.app',
    'http://localhost:5173',
    'https://634hq74p-5174.euw.devtunnels.ms',
  ];

  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
