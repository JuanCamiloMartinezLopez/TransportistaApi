import { inject, injectable } from 'inversify';
import { TYPES } from '@constants/types';

import { RegistroVehiculoInterface } from '@domain/interfaces/IUseCases/registroVehiculo.interface';
import { VehiculoRepository } from '@domain/interfaces/IRepositorys/VehiculoRepository.interface';
import { Vehiculo } from '@domain/entities/Vehiculo';
import { CustomError } from 'src/utils/CustomError';

@injectable()
export class RegistroVehiculoUseCase implements RegistroVehiculoInterface {
  constructor(@inject(TYPES.VehiculoRepository) private vehiculoRepository: VehiculoRepository) {}

  async execute(vehiculoData: Omit<Vehiculo, 'id' | 'activo' | 'transportista' | 'fecha_creacion' | 'fecha_modificacion'>): Promise<void> {
    let vehiculo = await this.vehiculoRepository.findByPlace(vehiculoData.placa);
    if (vehiculo) {
      throw new CustomError('vehiculo ya existe', 400);
    }

    vehiculo = new Vehiculo(null, vehiculoData.placa, vehiculoData.capacidad_volumen, vehiculoData.capacidad_peso);

    await this.vehiculoRepository.create(vehiculo);
  }
}
