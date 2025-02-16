import schemaValidator from '@middleware/schemaValidator';
import { inject } from 'inversify';
import { interfaces, controller, httpPost, request, response, httpGet } from 'inversify-express-utils';
import { creacionEnvioSchema, registroEnvioRequestSchema } from './schemas/envioSchemas';
import { Response, Request as ExpressRequest } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { TYPES } from '@constants/types';
import authentication from '@middleware/authentication';
import { RegistroEnvioInterface } from '@domain/interfaces/IUseCases/registroEnvio.interface';
import { ObtenerEnviosInterface } from '@domain/interfaces/IUseCases/obtenerEnvios.interface';
import { ConsultarEstadosEnviosInterface } from '@domain/interfaces/IUseCases/consultarEstadoEnvios.interface';
import { CustomError } from 'src/utils/CustomError';
import { DatabaseCache } from '@domain/interfaces/IRepositorys/DatabaseCache.interface';

interface Request extends ExpressRequest {
  usuario_id?: string;
}

@controller('/envio')
class EnvioController implements interfaces.Controller {
  constructor(
    @inject(TYPES.RegistroEnvioUseCase) private registroEnvioUseCase: RegistroEnvioInterface,
    @inject(TYPES.ObtenerEnvioUseCase) private obtenerEnvioUseCase: ObtenerEnviosInterface,
    @inject(TYPES.ConsultarEstadosEnviosUseCase) private consultarEstadosEnviosUseCase: ConsultarEstadosEnviosInterface
  ) {}

  @httpPost('/registro', authentication, schemaValidator.body(creacionEnvioSchema))
  async create(@request() req: ValidatedRequest<registroEnvioRequestSchema>, @response() res: Response) {
    const envio = await this.registroEnvioUseCase.execute(req.body);
    res.status(200).send({ envio: envio });
  }

  @httpGet('/consultar_estado', authentication)
  async consultar(@request() req: Request, @response() res: Response) {
    try {
      const usuario_id = req.usuario_id;
      const envio = await this.consultarEstadosEnviosUseCase.execute(parseInt(usuario_id!));
      res.status(200).send({ envio: envio });
    } catch (error) {
      throw new CustomError((error as Error).message, 400);
    }
  }

  @httpGet('/', authentication)
  async get(@request() req: ValidatedRequest<registroEnvioRequestSchema>, @response() res: Response) {
    const envios = await this.obtenerEnvioUseCase.execute();
    res.status(200).send({ envios: envios });
  }
}

export default EnvioController;
