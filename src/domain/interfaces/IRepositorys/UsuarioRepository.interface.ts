import { Usuario } from '../../entities/Usuario';

export interface UsuarioRepository {
  create(Usuario: Usuario): Promise<Usuario>;
  findByEmail(email: string): Promise<Usuario | null>;
}
