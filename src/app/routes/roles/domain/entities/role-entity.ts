interface RoleRequired {
  rol: string;
}

interface RoleOptional {
  id: number;
}

export type RoleProperties = RoleRequired & Partial<RoleOptional>;
export type RoleUpdate = { rol: string };

export class RoleEntity {
  readonly id!: number;
  readonly rol!: string;

  constructor(properties: RoleProperties) {
    Object.assign(this, properties);
  }

  properties(): RoleProperties {
    return {
      id: this.id,
      rol: this.rol,
    };
  }
}
