import { inject, injectable } from 'inversify';
import { TYPES } from '@constants/types';
import { AsignarEnviosRutaInterface } from '@domain/interfaces/IUseCases/asignarEnviosRuta';
import { Ruta } from '@domain/entities/Ruta';
import { RutaRepository } from '@domain/interfaces/IRepositorys/RutaRepository.interface';
import { TransportistaRepository } from '@domain/interfaces/IRepositorys/TransportistaRepository.interface';
import { EstadosRuta } from '@constants/estadosRuta';
import { CustomError } from 'src/utils/CustomError';
import { EntityMapper } from '@infrastructure/mappers/EntityMapper';
import { Vehiculo } from '@domain/entities/Vehiculo';
import { Envio } from '@domain/entities/Envio';
import Logger from '@middleware/logger';
import { EnvioModel } from '@infrastructure/orm/EnvioModel';
import Database from '@infrastructure/database/data-source';
import { EstadosEnvio } from '@constants/estadosEnvio';

@injectable()
export class AsignarEnviosRutaUseCase implements AsignarEnviosRutaInterface {
  constructor(
    @inject(TYPES.RutaRepository) private repositoryRuta: RutaRepository,
    @inject(TYPES.TransportistaRepository) private repositoryTransportista: TransportistaRepository,
    @inject(TYPES.Database) private db: Database
  ) {}

  async execute(envios_ruta: any): Promise<number[]> {
    try {
      const ruta = await this.repositoryRuta.findById(envios_ruta.ruta_id);
      if (!ruta) {
        throw new CustomError('la ruta no existe', 404);
      }
      if (ruta.estadoRuta !== EstadosRuta.GESTION) {
        throw new CustomError('la ruta no se encuentra en gestion', 400);
      }
      const transportista = await this.repositoryTransportista.findById(envios_ruta.transportista_id);
      if (!transportista) {
        throw new CustomError('el transportista no existe', 404);
      }

      if (transportista.vehiculos?.length == 0) {
        throw new CustomError('el transportista no tiene vehiculo asignado', 400);
      }

      transportista.vehiculos = transportista.vehiculos?.map((vehicle: Vehiculo) => {
        return EntityMapper.toDomain(vehicle, Vehiculo);
      });

      if (transportista.rutas?.length! > 0) {
        const noDisponible =
          transportista.rutas?.find((ruta: Ruta) => {
            ruta.estadoRuta == EstadosRuta.TRANSITO;
          }) == undefined
            ? false
            : true;
        if (noDisponible) {
          throw new CustomError('el transportista no se encuentra disponible', 400);
        }
      }

      const { enviosEncontrados, enviosNoEncontrados } = await this.obtenerUsuariosPorIds(envios_ruta.envios);

      ruta.transportista = transportista;
      ruta.envios = enviosEncontrados.map((envioModel: EnvioModel) => {
        const envio = EntityMapper.toDomain(envioModel, Envio);
        return envio;
      });
      ruta.setEstadoTransito();

      await this.repositoryRuta.create(ruta);

      return enviosNoEncontrados;
    } catch (err) {
      Logger.error(err);
      throw new CustomError('Error al realizar la asignacion.', 400);
    }
  }

  async obtenerUsuariosPorIds(ids: number[]) {
    const envioRepository = this.db.connection().getRepository(EnvioModel);
    const enviosEncontrados = await envioRepository
      .createQueryBuilder('envio')
      .leftJoinAndSelect('envio.estados', 'estado')
      .where('envio.id IN (:...ids)', { ids })
      .andWhere('envio.activo = true')
      .andWhere(
        `estado.id = (
        SELECT id FROM estado_envio 
        WHERE estado_envio.envio_id = envio.id 
        AND estado_envio.activo = true 
        ORDER BY estado_envio.fecha_creacion DESC 
        LIMIT 1
      )`
      )
      .andWhere('estado.estado = :estado', { estado: EstadosEnvio.ESPERA })
      .getMany();

    const idsEncontrados = enviosEncontrados.map((envioModel: EnvioModel) => {
      const envio = EntityMapper.toDomain(envioModel, Envio);
      return envio.id;
    });

    const enviosNoEncontrados = ids.filter((id) => !idsEncontrados.includes(id));

    return { enviosEncontrados, enviosNoEncontrados };
  }
}
