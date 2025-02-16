import { Settings } from '@settings';
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { RolesPremisos } from '@constants/rolesPermisos';
import * as jsonwebtoken from 'jsonwebtoken';

const authentication = (request: Request, response: Response, next: NextFunction): void => {
  const authCookie = request.cookies.access_token;
  console.log(request);
  if (!authCookie) {
    throw new Error('sin autenticacion');
  }
  jsonwebtoken.verify(authCookie, Settings.accessTokenSecret, (err: any, decoded: any) => {
    if (err) {
      throw new Error(err);
    }

    const roles = String(decoded.usuario_roles).split(',');
    if (roles.length === 0) {
      throw new Error('sin autorizacion');
    }

    const path_requested = request.route.path;
    let tienePermiso = roles.some((role) => {
      const permisos: string[] = RolesPremisos[role as keyof typeof RolesPremisos];
      return permisos && permisos.includes(path_requested);
    });

    if (!tienePermiso) {
      throw new Error('sin autorizacion');
    }

    console.log('token decoded', decoded);
    request.body.usuario = decoded.usuario_id;
    //request.user = decoded;
  });

  return next();
};

export default authentication;
