import { inject, injectable } from 'inversify';
import { Envio } from '@domain/entities/Envio';
import { ConsultarEstadosEnviosInterface } from '@domain/interfaces/IUseCases/consultarEstadoEnvios.interface';
import { EnvioRepository } from '@domain/interfaces/IRepositorys/EnvioRepository.interface';
import { TYPES } from '@constants/types';
import { CustomError } from 'src/utils/CustomError';

@injectable()
export class ConsultarEstadosEnviosUseCase implements ConsultarEstadosEnviosInterface {
  constructor(@inject(TYPES.EnvioRepository) private envioRepository: EnvioRepository) {}

  async execute(usuario_id: number): Promise<Envio[]> {
    if (!usuario_id) {
      throw new Error('Usuario ID is required');
    }

    try {
      return await this.envioRepository.findByUsuarioId(usuario_id);
    } catch (error) {
      throw new CustomError((error as Error).message, 400);
    }
  }
}
