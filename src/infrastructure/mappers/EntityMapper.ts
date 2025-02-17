import { BaseEntity } from 'typeorm';

export class EntityMapper {
  /**
   * Convierte un modelo de persistencia (ORM) a un modelo de dominio.
   * @param raw - Datos del ORM
   * @param DomainClass - Clase de dominio a instanciar
   * @returns Instancia del dominio
   */
  static toDomain<T extends object>(raw: any, DomainClass: { new (...args: any[]): T }): T {
    const instance = new DomainClass();
    Object.keys(raw).forEach((key) => {
      if (key in instance) {
        (instance as any)[key] = raw[key];
      }
    });
    return instance;
  }

  /**
   * Convierte un modelo de dominio a un formato compatible con el ORM.
   * @param domainEntity - Entidad de dominio
   * @returns Objeto plano para persistencia
   */
  static toPersistence<T>(domainEntity: T): any {
    return deepClone(domainEntity);
  }
}

/**
 * Realiza una copia profunda de un objeto.
 * @param obj - Objeto a clonar
 * @returns Clon profundo del objeto
 */
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
