import { Usuario } from '@domain/entities/Usuario';

export interface RegistroUsuarioInterface {
  execute(usuarioData: Omit<Usuario, 'id' | 'activo' | 'envios' | 'fecha_creacion' | 'fecha_modificacion'>): Promise<void>;
}
