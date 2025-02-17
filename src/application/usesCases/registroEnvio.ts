import { inject, injectable } from 'inversify';
import { Envio } from '@domain/entities/Envio';
import { Direccion } from '@domain/entities/Direccion';
import { EstadoEnvio } from '@domain/entities/EstadoEnvio';
import { TYPES } from '@constants/types';
import { RegistroEnvioInterface } from '@domain/interfaces/IUseCases/registroEnvio.interface';
import { DireccionRepository } from '@domain/interfaces/IRepositorys/DireccionRepository.interface';
import Logger from '@middleware/logger';
import { EstadosEnvio } from '@constants/estadosEnvio';
import { AddressValidation } from '@domain/interfaces/IExternalServices/addressValidation.interface';
import { CustomError } from 'src/utils/CustomError';

@injectable()
export class RegistroEnvioUseCase implements RegistroEnvioInterface {
  constructor(
    @inject(TYPES.AddressValidation) private addressValidetor: AddressValidation,
    @inject(TYPES.DireccionRepository) private repositoryDireccion: DireccionRepository
  ) {}

  async execute(envioData: Omit<Envio, 'id'>): Promise<void> {
    try {
      const estado_envio = new EstadoEnvio(null, EstadosEnvio.ESPERA);

      const envio = new Envio(null, envioData.peso, envioData.usuario, envioData.tipoProducto, envioData.alto, envioData.ancho, envioData.profundidad, [
        estado_envio
      ]);
      const direccion = new Direccion(
        null,
        envioData.direccion!.direccion,
        envioData.direccion!.barrio,
        envioData.direccion!.ciudad,
        envioData.direccion!.departamento,
        [envio],
        envioData.direccion?.codigoPosta
      );
      if (await this.addressValidetor.buscarDireccion(direccion)) {
        await this.repositoryDireccion.create(direccion);
      } else {
        throw new CustomError('Direccion no valida.', 400);
      }
    } catch (error) {
      Logger.error(error);
    }
  }
}
