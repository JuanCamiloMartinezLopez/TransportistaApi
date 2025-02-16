import { inject, injectable } from 'inversify';
import { Envio } from '@domain/entities/Envio';
import { TYPES } from '@constants/types';
import Logger from '@middleware/logger';
import { ObtenerEnviosInterface } from '@domain/interfaces/IUseCases/obtenerEnvios.interface';
import { EnvioRepository } from '@domain/interfaces/IRepositorys/EnvioRepository.interface';

@injectable()
export class ObtenerEnvioUseCase implements ObtenerEnviosInterface {
  constructor(@inject(TYPES.EnvioRepository) private repository: EnvioRepository) {}

  async execute(): Promise<Envio[]> {
    try {
      return await this.repository.get();
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }
}
