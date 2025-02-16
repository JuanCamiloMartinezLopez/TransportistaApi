import Logger from './logger';
import { CustomError } from 'src/utils/CustomError';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error(err);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      error: err.message,
      details: err.details || null
    });
  } else {
    res.status(500).json({ error: 'Error interno del servidor' });
  }

  next();
};
