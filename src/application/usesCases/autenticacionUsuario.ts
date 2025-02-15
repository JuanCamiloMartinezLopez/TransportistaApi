import { inject, injectable } from 'inversify';
import { UsuarioRepository } from '@domain/interfaces/UsuarioRepository.interface';
import { TYPES } from '@constants/types';
import { compare } from 'bcrypt';
import { AutenticacionUsuarioInterface } from '@domain/interfaces/autenticacionUsuario.interface';
import jwt from 'jsonwebtoken';
import { Settings } from '@settings';

@injectable()
export class AutenticacionUsuarioUseCase implements AutenticacionUsuarioInterface {
  constructor(@inject(TYPES.UsuarioRepository) private repository: UsuarioRepository) {}

  async login(email: string, pass: string): Promise<string> {
    const user = await this.repository.findByEmail(email);
    console.log(user);
    if (user!) {
      if (await compare(pass, user.password)) {
        console.log(Settings.accessTokenSecret);
        const token = jwt.sign({ user: user }, Settings.accessTokenSecret, {
          expiresIn: '24h'
        });
        return token;
      }
      throw new Error('contraseña incorrecta');
    }
    throw new Error('Usuaro no encontrado');
  }
}
