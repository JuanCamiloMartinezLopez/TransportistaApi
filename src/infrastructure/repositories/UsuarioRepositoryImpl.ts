import { inject, injectable } from 'inversify';
import { EntityMapper } from '../mappers/EntityMapper';
import { UsuarioRepository } from '@domain/interfaces/IRepositorys/UsuarioRepository.interface';
import { UsuarioModel } from '@infrastructure/orm/UsuarioModel';
import { Usuario } from '@domain/entities/Usuario';
import { TYPES } from '@constants/types';
import Database from '@infrastructure/database/data-source';
import { DatabaseInterface } from '@domain/interfaces/IRepositorys/Database.interface';

@injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
  private UsuarioRepo;
  constructor(
    @inject(TYPES.DatabaseInterface)
    private readonly db: DatabaseInterface
  ) {
    this.UsuarioRepo = this.db.connection().getRepository(UsuarioModel);
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const data = await this.UsuarioRepo.findOne({
      where: {
        email: email
      }
    });
    return data ? EntityMapper.toDomain(data, Usuario) : null;
  }

  async create(Usuario: Usuario): Promise<Usuario> {
    const usuarioEntity = EntityMapper.toPersistence(Usuario);
    return await this.UsuarioRepo.save(usuarioEntity);
  }
}
