import schemaValidator from '@middleware/schemaValidator';
import { inject } from 'inversify';
import { interfaces, controller, httpPost, request, response, httpGet } from 'inversify-express-utils';
import { creacionVehiculoSchema, registroVehiculoRequestSchema } from './schemas/vehiculoSchemas';
import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { TYPES } from '@constants/types';
import authentication from '@middleware/authentication';
import { RegistroVehiculoInterface } from '@domain/interfaces/IUseCases/registroVehiculo.interface';

@controller('/vehiculo')
class VehiculoController implements interfaces.Controller {
  constructor(@inject(TYPES.RegistroVehiculoUseCase) private registrarVehiculo: RegistroVehiculoInterface) {}

  @httpPost('/registro', authentication, schemaValidator.body(creacionVehiculoSchema))
  async create(@request() req: ValidatedRequest<registroVehiculoRequestSchema>, @response() res: Response) {
    await this.registrarVehiculo.execute(req.body);
    res.status(200).send({ message: 'ruta creada' });
  }
}

export default VehiculoController;
