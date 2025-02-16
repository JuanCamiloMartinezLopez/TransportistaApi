export const TYPES = {
  //db
  Database: Symbol.for('Database'),
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
  //services
  AddressValidation: Symbol.for('AddressValidation')
};
