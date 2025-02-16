import { EstadoEnvioModel } from '@infrastructure/orm/EstadoEnvioModel';
import { EstadoEnvio } from '@domain/entities/EstadoEnvio';
import { TYPES } from '@constants/types';
import Database from '@infrastructure/database/data-source';
import { EstadoEnvioRepository } from '@domain/interfaces/IRepositorys/EstadoEnvioRepository.interface';
import { EntityMapper } from '@infrastructure/mappers/EntityMapper';
import { injectable, inject } from 'inversify';

@injectable()
export class EstadoEnvioRepositoryImpl implements EstadoEnvioRepository {
  private EstadoEnvioRepo;
  constructor(
    @inject(TYPES.Database)
    private readonly db: Database
  ) {
    this.EstadoEnvioRepo = this.db.connection().getRepository(EstadoEnvioModel);
  }

  async create(EstadoEnvio: EstadoEnvio): Promise<EstadoEnvio> {
    const estadoEnvioEntity = EntityMapper.toPersistence(EstadoEnvio);
    return await this.EstadoEnvioRepo.save(estadoEnvioEntity);
  }
}
