import { TYPES } from '@constants/types';
import { Usuario } from '@domain/entities/Usuario';
import { UsuarioRepository } from '@domain/interfaces/UsuarioRepository.interface';
import { inject, injectable } from 'inversify';

@injectable()
class FetchUserByEmail {
  constructor(
    @inject(TYPES.UsuarioRepository)
    private readonly userRepository: UsuarioRepository
  ) {}

  async execute(email: string): Promise<Usuario> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('usuario no encontrado');
    }

    return user;
  }
}

export default FetchUserByEmail;
