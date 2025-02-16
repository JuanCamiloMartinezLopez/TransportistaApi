import { inject, injectable } from 'inversify';
import { UsuarioRepository } from '@domain/interfaces/IRepositorys/UsuarioRepository.interface';
import { TYPES } from '@constants/types';
import { compare } from 'bcrypt';
import { AutenticacionUsuarioInterface } from '@domain/interfaces/IUseCases/autenticacionUsuario.interface';
import jwt from 'jsonwebtoken';
import { Settings } from '@settings';
import { CustomError } from 'src/utils/CustomError';

@injectable()
export class AutenticacionUsuarioUseCase implements AutenticacionUsuarioInterface {
  constructor(@inject(TYPES.UsuarioRepository) private repository: UsuarioRepository) {}

  async login(email: string, pass: string): Promise<string> {
    const user = await this.repository.findByEmail(email);
    if (user!) {
      if (await compare(pass, user.password)) {
        const token = jwt.sign({ usuario_id: user.id, usuario_roles: user.roles ? user.roles : 'no_rol' }, Settings.accessTokenSecret, {
          expiresIn: '24h'
        });
        return token;
      }
      throw new CustomError('contraseña incorrecta', 401);
    }
    throw new CustomError('Usuaro no encontrado', 400);
  }
}
