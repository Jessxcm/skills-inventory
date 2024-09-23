interface MedicRequired {
  nombre: string;
  apellido: string;
  segundo_nombre: string;
  cmp: string;
  correo: string;
  dni: string;
  foto: string;
}

interface MedicOptionals {
  id: number;
  activo: boolean;
}

export type MedicProperties = Required<MedicRequired> & Partial<MedicOptionals>;
export type MedicUpdate = Partial<{
  nombre: string;
  apellido: string;
  segundo_nombre: string;
  cmp: string;
  correo: string;
  dni: string;
  foto: string;
}>;

export class Medic {
  private readonly id!: number;
  public nombre!: string;
  private apellido!: string;
  private segundo_nombre!: string;
  private cmp!: string;
  private correo!: string;
  private dni!: string;
  private foto!: string;
  private activo: boolean;

  constructor(properties: MedicProperties) {
    Object.assign(this, properties);
    this.activo = true;
  }

  properties(): MedicProperties {
    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      segundo_nombre: this.segundo_nombre,
      cmp: this.cmp,
      correo: this.correo,
      dni: this.dni,
      foto: this.foto,
      activo: this.activo,
    };
  }

  update(properties: MedicUpdate): void {
    Object.assign(this, properties);
  }

  delete(): void {
    this.activo = false;
  }
}
