import { Vehiculo } from '@domain/entities/Vehiculo';

export interface RegistroVehiculoInterface {
  execute(vehiculoData: Omit<Vehiculo, 'id' | 'activo' | 'transportista' | 'fecha_creacion' | 'fecha_modificacion'>): Promise<void>;
}
