import { RutaModel } from '@infrastructure/orm/RutaModel';
import { Ruta } from '@domain/entities/Ruta';
import { TYPES } from '@constants/types';
import Database from '@infrastructure/database/data-source';
import { RutaRepository } from '@domain/interfaces/IRepositorys/RutaRepository.interface';
import { EntityMapper } from '@infrastructure/mappers/EntityMapper';
import { injectable, inject } from 'inversify';

@injectable()
export class RutaRepositoryImpl implements RutaRepository {
  private RutaRepo;
  constructor(
    @inject(TYPES.Database)
    private readonly db: Database
  ) {
    this.RutaRepo = this.db.connection().getRepository(RutaModel);
  }
  async findById(id: number): Promise<Ruta | null> {
    const rutaEntity = await this.RutaRepo.findOne({ where: { id } });
    if (!rutaEntity) {
      return null;
    }
    return EntityMapper.toDomain(rutaEntity, Ruta);
  }

  async create(Ruta: Ruta): Promise<Ruta> {
    const rutaEntity = EntityMapper.toPersistence(Ruta);
    return await this.RutaRepo.save(rutaEntity);
  }
}
