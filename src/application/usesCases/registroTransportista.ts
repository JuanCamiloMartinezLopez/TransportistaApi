import { inject, injectable } from 'inversify';
import { TYPES } from '@constants/types';

import { RegistroTransportistaInterface } from '@domain/interfaces/IUseCases/registroTransportista.interface';
import { TransportistaRepository } from '@domain/interfaces/IRepositorys/TransportistaRepository.interface';
import { Transportista } from '@domain/entities/Transportista';
import { CustomError } from 'src/utils/CustomError';

@injectable()
export class RegistroTransportistaUseCase implements RegistroTransportistaInterface {
  constructor(@inject(TYPES.TransportistaRepository) private transportistaRepository: TransportistaRepository) {}

  async execute(transportistaData: Omit<Transportista, 'id' | 'activo' | 'vehiculos' | 'rutas' | 'fecha_creacion' | 'fecha_modificacion'>): Promise<void> {
    let transportista = await this.transportistaRepository.findByEmail(transportistaData.correo);
    if (transportista) {
      throw new CustomError('transportista ya existe', 400);
    }

    transportista = new Transportista(null, transportistaData.nombre, transportistaData.telefono, transportistaData.correo);

    await this.transportistaRepository.create(transportista);
  }
}
