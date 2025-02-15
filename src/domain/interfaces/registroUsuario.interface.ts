import { Usuario } from '@domain/entities/Usuario';

export interface RegistroUsuarioInterface {
  execute(usuarioData: Omit<Usuario, 'id'>): Promise<void>;
}
