import { Project, ProjectProperties } from './entities/project';

export class ProjectFactory {
  static create(nombre: string): Project {
    const projectProperties: ProjectProperties = {
      nombre,
    };

    // Reglas del negocio
    if (nombre.trim() === '') {
      throw new Error('Please enter name project');
    }

    return new Project(projectProperties);
  }
}
