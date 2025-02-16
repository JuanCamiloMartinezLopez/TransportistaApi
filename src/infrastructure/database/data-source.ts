import { DataSource } from 'typeorm';
import { Settings } from '@settings';
import Logger from '@middleware/logger';
import { injectable } from 'inversify';
import { UsuarioModel } from '@infrastructure/orm/UsuarioModel';
import { DireccionModel } from '@infrastructure/orm/DireccionModel';
import { EnvioModel } from '@infrastructure/orm/EnvioModel';
import { EstadoEnvioModel } from '@infrastructure/orm/EstadoEnvioModel';
import { RutaModel } from '@infrastructure/orm/RutaModel';
import { TransportistaModel } from '@infrastructure/orm/TransportistaModel';
import { VehiculoModel } from '@infrastructure/orm/VehiculoModel';

const db_connetion_info = Settings.database;

@injectable()
class Database {
  private instance: DataSource;

  constructor() {
    Logger.warn('iniciando db');
    this.instance = new DataSource({
      type: (db_connetion_info.client = 'postgres'),
      host: db_connetion_info.host,
      port: db_connetion_info.port,
      username: db_connetion_info.username,
      password: db_connetion_info.password,
      database: db_connetion_info.database,
      synchronize: true,
      logging: true,
      entities: [UsuarioModel, DireccionModel, EnvioModel, EstadoEnvioModel, RutaModel, TransportistaModel, VehiculoModel],
      subscribers: [],
      migrations: []
    });
    this.initializeConnection();
  }

  private async initializeConnection(): Promise<void> {
    try {
      await this.instance.initialize();
      Logger.info('database initialized!');
      this.checkConnection();
    } catch (err) {
      Logger.error('Error during Data Source initialization:', err);
    }
  }

  private async checkConnection(): Promise<void> {
    try {
      await this.instance.query('SELECT version();');
      Logger.info('database connected!');
    } catch (err) {
      Logger.error(err);
    }
  }

  connection(): DataSource {
    return this.instance;
  }
}

export default Database;
