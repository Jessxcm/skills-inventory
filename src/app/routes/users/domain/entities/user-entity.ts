export interface UserRequired {
  nombre: string;
  correo: string;
  password: string;
  roles: any;
}

export interface UserOptional {
  id: number;
  activo: boolean;
}

export type UserProperties = Required<UserRequired> & Partial<UserOptional>;

export type UserUpdate = {
  nombre: string;
  correo: string;
  password: string;
  roles: any;
};

export class UserEntity {
  private readonly id!: number;
  nombre!: string;
  private correo!: string;
  private password!: string;
  private roles: any;
  private activo: boolean;

  constructor(properties: UserProperties) {
    Object.assign(this, properties);
    this.activo = true;
  }

  properties(): UserProperties {
    return {
      id: this.id,
      nombre: this.nombre,
      correo: this.correo,
      password: this.password,
      roles: this.roles,
      activo: this.activo,
    };
  }

  update(properties: UserUpdate): void {
    Object.assign(this, properties);
  }

  delete(): void {
    this.activo = false;
  }
}
