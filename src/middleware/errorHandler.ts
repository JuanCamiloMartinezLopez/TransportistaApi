import { Request, Response, NextFunction } from 'express';
import Logger from './logger';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  Logger.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
  next();
}
