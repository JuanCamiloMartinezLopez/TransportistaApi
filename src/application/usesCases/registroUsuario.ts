import { inject, injectable } from 'inversify';
import { UsuarioRepository } from '@domain/interfaces/IRepositorys/UsuarioRepository.interface';
import { Usuario } from '@domain/entities/Usuario';
import { TYPES } from '@constants/types';
import { RegistroUsuarioInterface } from '@domain/interfaces/IUseCases/registroUsuario.interface';
import { hash } from 'bcrypt';

@injectable()
export class RegistroUsuarioUseCase implements RegistroUsuarioInterface {
  constructor(@inject(TYPES.UsuarioRepository) private repository: UsuarioRepository) {}

  async execute(usuarioData: Omit<Usuario, 'id'>): Promise<void> {
    const usuario = new Usuario(
      null,
      usuarioData.nombres,
      usuarioData.apellidos,
      usuarioData.email,
      usuarioData.password,
      usuarioData.telefono,
      usuarioData.roles
    );

    const hashedPassword = await hash(usuario.password, 10);
    usuario.setPassword(hashedPassword);
    await this.repository.create(usuario);
  }
}
