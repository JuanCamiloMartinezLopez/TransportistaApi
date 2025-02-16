import { Transportista } from '@domain/entities/Transportista';

export interface RegistroTransportistaInterface {
  execute(transportistaData: Omit<Transportista, 'id' | 'activo' | 'rutas' | 'vehiculos' | 'fecha_creacion' | 'fecha_modificacion'>): Promise<void>;
}
