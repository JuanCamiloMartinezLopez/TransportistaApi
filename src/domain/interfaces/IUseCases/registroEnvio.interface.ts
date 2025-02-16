import { Envio } from '@domain/entities/Envio';

export interface RegistroEnvioInterface {
  execute(usuarioData: Omit<Envio, 'id' | 'activo' | 'ruta' | 'estados' | 'fecha_creacion' | 'fecha_modificacion'>): Promise<void>;
}
