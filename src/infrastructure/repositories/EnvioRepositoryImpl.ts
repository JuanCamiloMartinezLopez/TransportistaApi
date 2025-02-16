import { EnvioModel } from '@infrastructure/orm/EnvioModel';
import { Envio } from '@domain/entities/Envio';
import { TYPES } from '@constants/types';
import Database from '@infrastructure/database/data-source';
import { EnvioRepository } from '@domain/interfaces/IRepositorys/EnvioRepository.interface';
import { EntityMapper } from '@infrastructure/mappers/EntityMapper';
import { injectable, inject } from 'inversify';

@injectable()
export class EnvioRepositoryImpl implements EnvioRepository {
  private EnvioRepo;
  constructor(
    @inject(TYPES.Database)
    private readonly db: Database
  ) {
    this.EnvioRepo = this.db.connection().getRepository(EnvioModel);
  }
  async get(): Promise<Envio[]> {
    const envios_raw = await this.EnvioRepo.find({
      relations: ['usuario', 'direccion', 'ruta', 'estados'] // Incluir direcciones
    });
    console.log('envios', envios_raw);
    const envios: Envio[] = envios_raw.map((envio) => EntityMapper.toDomain(envio, Envio));
    return envios;
  }

  async create(Envio: Envio): Promise<Envio> {
    const envioEntity = EntityMapper.toPersistence(Envio);
    return await this.EnvioRepo.save(envioEntity);
  }
}
