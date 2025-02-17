import { TransportistaModel } from '@infrastructure/orm/TransportistaModel';
import { Transportista } from '@domain/entities/Transportista';
import { TYPES } from '@constants/types';
import Database from '@infrastructure/database/data-source';
import { TransportistaRepository } from '@domain/interfaces/IRepositorys/TransportistaRepository.interface';
import { EntityMapper } from '@infrastructure/mappers/EntityMapper';
import { injectable, inject } from 'inversify';
import { DatabaseInterface } from '@domain/interfaces/IRepositorys/Database.interface';

@injectable()
export class TransportistaRepositoryImpl implements TransportistaRepository {
  private TransportistaRepo;
  constructor(
    @inject(TYPES.DatabaseInterface)
    private readonly db: DatabaseInterface
  ) {
    this.TransportistaRepo = this.db.connection().getRepository(TransportistaModel);
  }

  async findByEmail(email: string): Promise<Transportista | null> {
    const transportistaEntity = await this.TransportistaRepo.findOne({ where: { correo: email }, relations: ['rutas', 'vehiculos'] });
    if (!transportistaEntity) {
      return null;
    }
    return EntityMapper.toDomain(transportistaEntity, Transportista);
  }

  async findById(id: number): Promise<Transportista | null> {
    const transportistaEntity = await this.TransportistaRepo.findOne({ where: { id }, relations: ['rutas', 'vehiculos'] });
    if (!transportistaEntity) {
      return null;
    }
    return EntityMapper.toDomain(transportistaEntity, Transportista);
  }

  async create(Transportista: Transportista): Promise<Transportista> {
    const transportistaEntity = EntityMapper.toPersistence(Transportista);
    return await this.TransportistaRepo.save(transportistaEntity);
  }
}
