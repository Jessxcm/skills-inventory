import { Medic, MedicProperties } from './medic';

export class MedicFactory {
  static create(
    nombre: string,
    apellido: string,
    segundo_nombre: string,
    cmp: string,
    correo: string,
    dni: string,
    foto: string
  ): Medic {
    const medicProperties: MedicProperties = {
      nombre,
      apellido,
      segundo_nombre,
      cmp,
      correo,
      dni,
      foto,
    };

    if (nombre.trim() === '') {
      throw new Error('El nombre no puede estar vacío');
    }

    return new Medic(medicProperties);
  }
}
