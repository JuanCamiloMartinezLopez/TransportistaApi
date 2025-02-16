export const TYPES = {
  //db
  Database: Symbol.for('Database'),
  Redis: Symbol.for('Redis'),
  //repositorios
  UsuarioRepository: Symbol.for('UsuarioRepository'),
  EnvioRepository: Symbol.for('EnvioRepository'),
  DireccionRepository: Symbol.for('DireccionRepository'),
  EstadoEnvioRepository: Symbol.for('EstadoEnvioRepository'),
  RutaRepository: Symbol.for('RutaRepository'),
  TransportistaRepository: Symbol.for('TransportistaRepository'),
  VehiculoRepository: Symbol.for('VehiculoRepository'),
  //casos de uso
  RegistroUsuarioUseCase: Symbol.for('RegistroUsuarioUseCase'),
  AutenticacionUsuarioUseCase: Symbol.for('AutenticacionUsuarioUseCase'),
  RegistroEnvioUseCase: Symbol.for('RegistroEnvioUseCase'),
  ObtenerEnvioUseCase: Symbol.for('ObtenerEnvioUseCase'),
  AsignarEnviosRutaUseCase: Symbol.for('AsignarEnviosRutaUseCase'),
  RegistroRutaUseCase: Symbol.for('RegistroRutaUseCase'),
  RegistroVehiculoUseCase: Symbol.for('RegistroVehiculoUseCase'),
  RegistroTransportistaUseCase: Symbol.for('RegistroTransportistaUseCase'),
  ConsultarEstadosEnviosUseCase: Symbol.for('ConsultarEstadosEnviosUseCase'),
  //services
  AddressValidation: Symbol.for('AddressValidation')
};
