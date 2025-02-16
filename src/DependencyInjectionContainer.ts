import { TYPES } from '@constants/types';
import { Container } from 'inversify';
import { UsuarioRepositoryImpl } from '@infrastructure/repositories/UsuarioRepositoryImpl';
import { UsuarioRepository } from '@domain/interfaces/IRepositorys/UsuarioRepository.interface';
import { RegistroUsuarioUseCase } from '@application/usesCases/registroUsuario';
import Database from '@infrastructure/database/data-source';
import { AutenticacionUsuarioUseCase } from '@application/usesCases/autenticacionUsuario';
import { EnvioRepository } from '@domain/interfaces/IRepositorys/EnvioRepository.interface';
import { EnvioRepositoryImpl } from '@infrastructure/repositories/EnvioRepositoryImpl';
import { DireccionRepositoryImpl } from '@infrastructure/repositories/DireccionRepositoryImpl';
import { DireccionRepository } from '@domain/interfaces/IRepositorys/DireccionRepository.interface';
import { RegistroEnvioUseCase } from '@application/usesCases/registroEnvio';
import { AddressValidationNominatiom } from '@application/externalServices/addressValidationNominatim';
import { ObtenerEnvioUseCase } from '@application/usesCases/obtenerEnvio';
import { Redis } from '@infrastructure/database/redisdb';
import { RutaRepository } from '@domain/interfaces/IRepositorys/RutaRepository.interface';
import { RutaRepositoryImpl } from '@infrastructure/repositories/RutaRepositoryImpl';
import { EstadoEnvioRepository } from '@domain/interfaces/IRepositorys/EstadoEnvioRepository.interface';
import { TransportistaRepository } from '@domain/interfaces/IRepositorys/TransportistaRepository.interface';
import { VehiculoRepository } from '@domain/interfaces/IRepositorys/VehiculoRepository.interface';
import { EstadoEnvioRepositoryImpl } from '@infrastructure/repositories/EstadoEnvioRepositoryImpl';
import { TransportistaRepositoryImpl } from '@infrastructure/repositories/TransportistaRepositoryImpl';
import { VehiculoRepositoryImpl } from '@infrastructure/repositories/VehiculoRepositoryImpl';
import { AsignarEnviosRutaUseCase } from '@application/usesCases/asignarEnviosRuta';
import { RegistroRutaUseCase } from '@application/usesCases/registroRuta';
import { RegistroTransportistaUseCase } from '@application/usesCases/registroTransportista';
import { RegistroVehiculoUseCase } from '@application/usesCases/registroVehiculo';
import './api/usuario/usuarioController';
import './api/autenticacion/autenticacionController';
import './api/envio/envioController';
import './api/ruta/rutaController';
import './api/transportista/transportistaController';
import './api/vehiculo/vehiculoController';

const container = new Container();

//database
container.bind<Database>(TYPES.Database).to(Database).inSingletonScope();
container.bind<Redis>(TYPES.Redis).to(Redis).inSingletonScope();

//repositorios
container.bind<UsuarioRepository>(TYPES.UsuarioRepository).to(UsuarioRepositoryImpl);
container.bind<EnvioRepository>(TYPES.EnvioRepository).to(EnvioRepositoryImpl);
container.bind<DireccionRepository>(TYPES.DireccionRepository).to(DireccionRepositoryImpl);
container.bind<EstadoEnvioRepository>(TYPES.EstadoEnvioRepository).to(EstadoEnvioRepositoryImpl);
container.bind<RutaRepository>(TYPES.RutaRepository).to(RutaRepositoryImpl);
container.bind<TransportistaRepository>(TYPES.TransportistaRepository).to(TransportistaRepositoryImpl);
container.bind<VehiculoRepository>(TYPES.VehiculoRepository).to(VehiculoRepositoryImpl);

//casos de uso
container.bind<RegistroUsuarioUseCase>(TYPES.RegistroUsuarioUseCase).to(RegistroUsuarioUseCase);
container.bind<AutenticacionUsuarioUseCase>(TYPES.AutenticacionUsuarioUseCase).to(AutenticacionUsuarioUseCase);
container.bind<RegistroEnvioUseCase>(TYPES.RegistroEnvioUseCase).to(RegistroEnvioUseCase);
container.bind<ObtenerEnvioUseCase>(TYPES.ObtenerEnvioUseCase).to(ObtenerEnvioUseCase);
container.bind<AsignarEnviosRutaUseCase>(TYPES.AsignarEnviosRutaUseCase).to(AsignarEnviosRutaUseCase);
container.bind<RegistroRutaUseCase>(TYPES.RegistroRutaUseCase).to(RegistroRutaUseCase);
container.bind<RegistroTransportistaUseCase>(TYPES.RegistroTransportistaUseCase).to(RegistroTransportistaUseCase);
container.bind<RegistroVehiculoUseCase>(TYPES.RegistroVehiculoUseCase).to(RegistroVehiculoUseCase);

//servicios
container.bind<AddressValidationNominatiom>(TYPES.AddressValidation).to(AddressValidationNominatiom);

export default container;
