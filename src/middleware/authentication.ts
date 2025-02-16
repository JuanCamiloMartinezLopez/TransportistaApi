import { Settings } from '@settings';
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { RolesPremisos } from '@constants/rolesPermisos';
import * as jsonwebtoken from 'jsonwebtoken';
import { CustomError } from 'src/utils/CustomError';

const authentication = (request: Request, response: Response, next: NextFunction): void => {
  const authCookie = request.cookies.access_token;
  if (!authCookie) {
    throw new CustomError('sin autenticacion', 401);
  }
  jsonwebtoken.verify(authCookie, Settings.accessTokenSecret, (err: any, decoded: any) => {
    if (err) {
      throw new CustomError(err, 400);
    }

    const roles = String(decoded.usuario_roles).split(',');
    if (roles.length === 0) {
      throw new CustomError('sin autorizacion', 403);
    }

    const path_requested = request.route.path;
    let tienePermiso = roles.some((role) => {
      const permisos: string[] = RolesPremisos[role as keyof typeof RolesPremisos];
      return permisos && permisos.includes(path_requested);
    });

    if (!tienePermiso) {
      throw new CustomError('sin autorizacion', 403);
    }

    Object.keys(request.body).includes('usuario') ? (request.body.usuario = decoded.usuario_id) : null;
    //request.user = decoded;
  });

  return next();
};

export default authentication;
