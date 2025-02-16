import schemaValidator from '@middleware/schemaValidator';
import { inject } from 'inversify';
import { interfaces, controller, httpPost, request, response, httpGet } from 'inversify-express-utils';
import { creacionTransportistaSchema, registroTransportistaRequestSchema } from './schemas/transportistaSchemas';
import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { TYPES } from '@constants/types';
import authentication from '@middleware/authentication';
import { RegistroTransportistaInterface } from '@domain/interfaces/IUseCases/registroTransportista.interface';

@controller('/transportista')
class TransportistaController implements interfaces.Controller {
  constructor(@inject(TYPES.RegistroTransportistaUseCase) private registrarTransportista: RegistroTransportistaInterface) {}

  @httpPost('/registro', authentication, schemaValidator.body(creacionTransportistaSchema))
  async create(@request() req: ValidatedRequest<registroTransportistaRequestSchema>, @response() res: Response) {
    await this.registrarTransportista.execute(req.body);
    res.status(200).send({ message: 'ruta creada' });
  }
}

export default TransportistaController;
