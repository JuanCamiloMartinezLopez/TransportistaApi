import { TYPES } from '@constants/types';
import { Usuario } from '@domain/entities/Usuario';
import { UsuarioRepository } from '@domain/interfaces/IRepositorys/UsuarioRepository.interface';
import { inject, injectable } from 'inversify';
import { CustomError } from 'src/utils/CustomError';

@injectable()
class FetchUserByEmail {
  constructor(
    @inject(TYPES.UsuarioRepository)
    private readonly userRepository: UsuarioRepository
  ) {}

  async execute(email: string): Promise<Usuario> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new CustomError('usuario no encontrado', 404);
    }

    return user;
  }
}

export default FetchUserByEmail;
