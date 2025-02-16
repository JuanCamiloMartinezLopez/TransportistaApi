export class CustomError extends Error {
  public statusCode: number;
  public details?: any;

  constructor(message: string, statusCode: number = 500, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;

    // Captura el stack trace sin incluir esta clase en la pila de llamadas
    Error.captureStackTrace(this, this.constructor);
  }
}
