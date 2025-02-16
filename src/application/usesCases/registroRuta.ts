import { EstadosRuta } from '@constants/estadosRuta';
import { TYPES } from '@constants/types';
import { Ruta } from '@domain/entities/Ruta';
import { RutaRepository } from '@domain/interfaces/IRepositorys/RutaRepository.interface';
import { RegistroRutaInterface } from '@domain/interfaces/IUseCases/registroRuta.interface';
import { inject } from 'inversify';

export class RegistroRutaUseCase implements RegistroRutaInterface {
  constructor(@inject(TYPES.RutaRepository) private repository: RutaRepository) {}

  async execute(rutaData: Omit<Ruta, 'id' | 'activo' | 'fecha_creacion' | 'fecha_modificacion'>): Promise<void> {
    const ruta = new Ruta(null, rutaData.nombre, rutaData.origen, rutaData.destino, EstadosRuta.GESTION);
    await this.repository.create(ruta);
  }
}
