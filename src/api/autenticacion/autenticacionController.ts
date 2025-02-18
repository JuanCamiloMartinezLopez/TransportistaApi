import schemaValidator from '@middleware/schemaValidator';
import { inject } from 'inversify';
import { interfaces, controller, httpPost, request, response, httpGet } from 'inversify-express-utils';
import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { loginAuthSchema, loginRequestSchema } from './schemas/autenticacionSchemas';
import { TYPES } from '@constants/types';
import { AutenticacionUsuarioInterface } from '@domain/interfaces/IUseCases/autenticacionUsuario.interface';
import Logger from '@middleware/logger';
import authentication from '@middleware/authentication';

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints relacionados con Auth
 */

/**
 * Controlador para manejar las operaciones relacionadas con la autenticacion.
 */
@controller('/auth')
class AuthController implements interfaces.Controller {
  constructor(@inject(TYPES.AutenticacionUsuarioUseCase) private autenticacionUsuario: AutenticacionUsuarioInterface) {}

  @httpPost('/login', schemaValidator.body(loginAuthSchema))
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Crea una sesión de usuario mediante el login.
   *     description: Este endpoint permite a un usuario iniciar sesión proporcionando su correo electrónico y contraseña. Si las credenciales son correctas, se devuelve un token de acceso en una cookie.
   *     tags:
   *       - Autenticación
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: './src/api/autenticacion/schemas/autenticacionSchemas.loginRequestSchema'
   *     responses:
   *       200:
   *         description: Login correcto.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: login correcto
   *       400:
   *         description: Error al realizar el login.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Error al realizar el login
   *     security:
   *       - cookieAuth: []
   */
  async login(@request() req: ValidatedRequest<loginRequestSchema>, @response() res: Response) {
    const { email, password } = req.body;
    try {
      const token = await this.autenticacionUsuario.login(email, password);
      res.cookie('access_token', token, { httpOnly: true }).send({ message: 'login correcto' });
    } catch (err) {
      Logger.error(err);
      res.status(400).send({ message: 'Error al realizar el login' });
    }
  }

  @httpGet('/logout', authentication)
  async logout(@request() req: Request, @response() res: Response) {
    try {
      res.status(200).clearCookie('access_token');
      res.send({ message: 'logout exitoso' });
    } catch (err) {
      Logger.error(err);
      res.status(400).send({ message: 'Error al realizar el logout' });
    }
  }
}

export default AuthController;
