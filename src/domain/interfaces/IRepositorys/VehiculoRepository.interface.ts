import { Vehiculo } from '@domain/entities/Vehiculo';

export interface VehiculoRepository {
  create(vehiculo: Vehiculo): Promise<Vehiculo>;
}
