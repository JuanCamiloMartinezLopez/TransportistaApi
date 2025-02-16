import { inject, injectable } from 'inversify';
import { TYPES } from '@constants/types';
import { AsignarEnviosRutaInterface } from '@domain/interfaces/IUseCases/asignarEnviosRuta';
import { Ruta } from '@domain/entities/Ruta';
import { RutaRepository } from '@domain/interfaces/IRepositorys/RutaRepository.interface';
import { EnvioRepository } from '@domain/interfaces/IRepositorys/EnvioRepository.interface';
import { TransportistaRepository } from '@domain/interfaces/IRepositorys/TransportistaRepository.interface';
import { EstadosRuta } from '@constants/estadosRuta';
import { CustomError } from 'src/utils/CustomError';

@injectable()
export class AsignarEnviosRutaUseCase implements AsignarEnviosRutaInterface {
  constructor(
    @inject(TYPES.RutaRepository) private repositoryRuta: RutaRepository,
    @inject(TYPES.TransportistaRepository) private repositoryTransportista: TransportistaRepository,
    @inject(TYPES.EnvioRepository) private repositoryEnvio: EnvioRepository
  ) {}

  async execute(envios_ruta: any): Promise<void> {
    const ruta = await this.repositoryRuta.findById(envios_ruta.ruta_id);
    if (!ruta) {
      throw new CustomError('la ruta no existe', 404);
    }
    if (ruta.estadoRuta !== EstadosRuta.GESTION) {
      throw new CustomError('la ruta no se encuentra en gestion', 400);
    }
    const transportista = await this.repositoryTransportista.findById(envios_ruta.transportista_id);
    if (!transportista) {
      throw new CustomError('el transportista no existe', 404);
    }
    //await this.repositoryRuta.create(envios_ruta);
  }
}
