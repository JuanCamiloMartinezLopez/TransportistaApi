import { Ruta } from '@domain/entities/Ruta';

export interface RegistroRutaInterface {
  execute(rutaData: Omit<Ruta, 'id' | 'activo' | 'envios' | 'transportista' | 'fecha_creacion' | 'fecha_modificacion'>): Promise<void>;
}
