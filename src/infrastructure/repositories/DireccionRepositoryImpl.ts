import { inject, injectable } from 'inversify';
import { EntityMapper } from '../mappers/EntityMapper';
import { DireccionRepository } from '@domain/interfaces/IRepositorys/DireccionRepository.interface';
import { DireccionModel } from '@infrastructure/orm/DireccionModel';
import { Direccion } from '@domain/entities/Direccion';
import { TYPES } from '@constants/types';
import { DatabaseInterface } from '@domain/interfaces/IRepositorys/Database.interface';

@injectable()
export class DireccionRepositoryImpl implements DireccionRepository {
  private DireccionRepo;
  constructor(
    @inject(TYPES.DatabaseInterface)
    private readonly db: DatabaseInterface
  ) {
    this.DireccionRepo = this.db.connection().getRepository(DireccionModel);
  }

  async create(Direccion: Direccion): Promise<Direccion> {
    const direccionEntity = EntityMapper.toPersistence(Direccion);
    return await this.DireccionRepo.save(direccionEntity);
  }
}
