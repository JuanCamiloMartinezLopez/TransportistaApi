import schemaValidator from '@middleware/schemaValidator';
import { inject } from 'inversify';
import { interfaces, controller, httpPost, request, response, httpGet } from 'inversify-express-utils';
import { creacionRutaSchema, asignarEnviosRutaSchema, registroEnviosRutaRequestSchema, registroRutaRequestSchema } from './schemas/rutaSchemas';
import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { TYPES } from '@constants/types';
import authentication from '@middleware/authentication';
import { AsignarEnviosRutaInterface } from '@domain/interfaces/IUseCases/asignarEnviosRuta';
import { RegistroRutaInterface } from '@domain/interfaces/IUseCases/registroRuta.interface';

@controller('/ruta')
class RutaController implements interfaces.Controller {
  constructor(
    @inject(TYPES.AsignarEnviosRutaUseCase) private asignarEnviosRutaUseCase: AsignarEnviosRutaInterface,
    @inject(TYPES.RegistroRutaUseCase) private registraRutaUseCase: RegistroRutaInterface
  ) {}

  @httpPost('/asignar_envios', authentication, schemaValidator.body(asignarEnviosRutaSchema))
  async asignar(@request() req: ValidatedRequest<registroEnviosRutaRequestSchema>, @response() res: Response) {
    const enviosNoEncontrados = await this.asignarEnviosRutaUseCase.execute(req.body);
    if (enviosNoEncontrados.length == 0) {
      res.status(200).send({ message: 'envios asignados con exito' });
    } else {
      res.status(200).send({ message: 'envios asignados con exito', enviosNoAsignados: enviosNoEncontrados });
    }
  }

  @httpPost('/registro', authentication, schemaValidator.body(creacionRutaSchema))
  async create(@request() req: ValidatedRequest<registroRutaRequestSchema>, @response() res: Response) {
    await this.registraRutaUseCase.execute(req.body);
    res.status(200).send({ message: 'ruta creada' });
  }
}

export default RutaController;
