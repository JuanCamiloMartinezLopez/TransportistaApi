import schemaValidator from '@middleware/schemaValidator';
import { inject } from 'inversify';
import { interfaces, controller, httpPost, request, response, httpGet } from 'inversify-express-utils';
import { creacionUsuarioSchema, registroUsuarioRequestSchema } from './schemas/usuarioSchemas';
import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { TYPES } from '@constants/types';
import { RegistroUsuarioInterface } from '@domain/interfaces/IUseCases/registroUsuario.interface';

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints relacionados con usuarios
 */

/**
 * Controlador para manejar las operaciones relacionadas con los usuarios.
 */
@controller('/usuario')
class UsuarioController implements interfaces.Controller {
  /**
   * Constructor del controlador de usuarios.
   * @param registroUsuarioUseCase - Caso de uso para el registro de usuarios.
   */
  constructor(@inject(TYPES.RegistroUsuarioUseCase) private registroUsuarioUseCase: RegistroUsuarioInterface) {}

  /**
   * @swagger
   * /usuario/registro:
   *   post:
   *     summary: Crea un nuevo usuario
   *     tags: [Usuarios]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreacionUsuarioSchema'
   *     responses:
   *       200:
   *         description: Usuario creado exitosamente
   *       400:
   *         description: Error en la solicitud
   *       500:
   *         description: Error interno del servidor
   */
  @httpPost('/registro', schemaValidator.body(creacionUsuarioSchema))
  async create(@request() req: ValidatedRequest<registroUsuarioRequestSchema>, @response() res: Response) {
    await this.registroUsuarioUseCase.execute(req.body);
    res.status(200).send('Usuario creado');
  }
}

export default UsuarioController;
