import { inject, injectable } from 'inversify';
import { UsuarioRepository } from '@domain/interfaces/IRepositorys/UsuarioRepository.interface';
import { TYPES } from '@constants/types';
import { compare } from 'bcrypt';
import { AutenticacionUsuarioInterface } from '@domain/interfaces/IUseCases/autenticacionUsuario.interface';
import jwt from 'jsonwebtoken';
import { Settings } from '@settings';

@injectable()
export class AutenticacionUsuarioUseCase implements AutenticacionUsuarioInterface {
  constructor(@inject(TYPES.UsuarioRepository) private repository: UsuarioRepository) {}

  async login(email: string, pass: string): Promise<string> {
    const user = await this.repository.findByEmail(email);
    if (user!) {
      if (await compare(pass, user.password)) {
        console.log(Settings.accessTokenSecret);
        const token = jwt.sign({ usuario_id: user.id, usuario_roles: user.roles ? user.roles : 'no_rol' }, Settings.accessTokenSecret, {
          expiresIn: '24h'
        });
        return token;
      }
      throw new Error('contraseña incorrecta');
    }
    throw new Error('Usuaro no encontrado');
  }
}
