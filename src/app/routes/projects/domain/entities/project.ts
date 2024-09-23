interface ProjectRequired {
  nombre: string;
  /* PK: string;
  SK: string;
  GSI1PK: string;
  GSI1SK: string;
  type: string;
  client: string;
  nameProject: string; */
}

interface ProjectOptionals {
  id: number;
  activo: boolean;
  /* observations: string[]; */
}

export type ProjectProperties = Required<ProjectRequired> & Partial<ProjectOptionals>;
export type ProjectUpdate = {
  nombre: string;
};

export class Project {
  private readonly id!: number;
  private name!: string;
  private activo!: boolean;
  nombre: any;

  constructor(properties: ProjectProperties) {
    Object.assign(this, properties);
    this.activo = true;
  }

  properties(): ProjectProperties {
    return {
      id: this.id,
      nombre: this.name,
      activo: this.activo,
    };
  }

  update(properties: ProjectUpdate) {
    Object.assign(this, properties);
  }

  delete(): void {
    this.activo = false;
  }
}
