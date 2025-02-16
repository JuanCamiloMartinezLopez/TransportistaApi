import { Vehiculo } from '@domain/entities/Vehiculo';

export interface VehiculoRepository {
  create(vehiculo: Vehiculo): Promise<Vehiculo>;
  findById(id: number): Promise<Vehiculo | null>;
  findByPlace(placa: string): Promise<Vehiculo | null>;
}
