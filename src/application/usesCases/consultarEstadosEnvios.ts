import { inject, injectable } from 'inversify';
import { Envio } from '@domain/entities/Envio';
import { ConsultarEstadosEnviosInterface } from '@domain/interfaces/IUseCases/consultarEstadoEnvios.interface';
import { EnvioRepository } from '@domain/interfaces/IRepositorys/EnvioRepository.interface';
import { TYPES } from '@constants/types';
import { CustomError } from 'src/utils/CustomError';
import { DatabaseCache } from '@domain/interfaces/IRepositorys/DatabaseCache.interface';

@injectable()
export class ConsultarEstadosEnviosUseCase implements ConsultarEstadosEnviosInterface {
  constructor(
    @inject(TYPES.EnvioRepository) private envioRepository: EnvioRepository,
    @inject(TYPES.DatabaseCache) private redis: DatabaseCache
  ) {}

  async execute(usuario_id: number): Promise<Envio[]> {
    if (!usuario_id) {
      throw new Error('Usuario id es requerido');
    }

    try {
      const reply = await this.redis.getValue(usuario_id.toString());
      if (reply) return JSON.parse(reply);
      const envios = await this.envioRepository.findByUsuarioId(usuario_id);
      await this.redis.setValue(usuario_id.toString(), JSON.stringify(envios));
      return envios;
    } catch (error) {
      throw new CustomError((error as Error).message, 400);
    }
  }
}
