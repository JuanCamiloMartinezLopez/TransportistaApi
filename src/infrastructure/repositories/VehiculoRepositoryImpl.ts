import { VehiculoModel } from '@infrastructure/orm/VehiculoModel';
import { Vehiculo } from '@domain/entities/Vehiculo';
import { TYPES } from '@constants/types';
import Database from '@infrastructure/database/data-source';
import { VehiculoRepository } from '@domain/interfaces/IRepositorys/VehiculoRepository.interface';
import { EntityMapper } from '@infrastructure/mappers/EntityMapper';
import { injectable, inject } from 'inversify';
import { DatabaseInterface } from '@domain/interfaces/IRepositorys/Database.interface';

@injectable()
export class VehiculoRepositoryImpl implements VehiculoRepository {
  private VehiculoRepo;
  constructor(
    @inject(TYPES.DatabaseInterface)
    private readonly db: DatabaseInterface
  ) {
    this.VehiculoRepo = this.db.connection().getRepository(VehiculoModel);
  }

  async findByPlace(placa: string): Promise<Vehiculo | null> {
    const vehiculoEntity = await this.VehiculoRepo.findOne({ where: { placa }, relations: ['transportista'] });
    if (!vehiculoEntity) {
      return null;
    }
    return EntityMapper.toDomain(vehiculoEntity, Vehiculo);
  }

  async findById(id: number): Promise<Vehiculo | null> {
    const vehiculoEntity = await this.VehiculoRepo.findOne({ where: { id }, relations: ['transportista'] });
    if (!vehiculoEntity) {
      return null;
    }
    return EntityMapper.toDomain(vehiculoEntity, Vehiculo);
  }

  async create(Vehiculo: Vehiculo): Promise<Vehiculo> {
    const vehiculoEntity = EntityMapper.toPersistence(Vehiculo);
    return await this.VehiculoRepo.save(vehiculoEntity);
  }
}
