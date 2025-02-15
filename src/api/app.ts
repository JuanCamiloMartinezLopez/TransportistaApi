import 'reflect-metadata';

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { errorHandler } from '../middleware/errorHandler';
import Logger from '../middleware/logger';
import cors from 'cors';
import { setupSwagger } from '../swagger';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from '@dependencyInjectionContainer';
import morganMiddleware from '@middleware/morganMiddleware';
import cookieParser from 'cookie-parser';

//const app = express();

//app.use(cors());
//app.use(express.json());
//app.use(morganMiddleware);
//app.use("/api",)
//app.use(errorHandler);
//setupSwagger(app);

export default new InversifyExpressServer(container, null, { rootPath: '/api/v1' })
  .setConfig((app: express.Application) => {
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());
    app.use(morganMiddleware);
  })
  .setErrorConfig((app: express.Application) => {
    app.use(errorHandler);
  });
