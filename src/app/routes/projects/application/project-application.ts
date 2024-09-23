import { Inject, Injectable } from '@angular/core';
import { BaseApplication } from '@core/application/base-application';
import { Project } from '../domain/entities/project';
import { ProjectRepository } from '../domain/repositories/project-repository';
import { ProjectInfrastructure } from '../infrastructure/project-infrastructure';

@Injectable()
export class ProjectApplication extends BaseApplication<Project, ProjectRepository> {
  constructor(
    @Inject(ProjectInfrastructure) private readonly projectRepository: ProjectRepository
  ) {
    super(projectRepository);
  }
}

/* @Injectable()
export class ProjectApplication {
  constructor(
    @Inject(ProjectInfrastructure) private readonly projectRepository: ProjectRepository
  ) {}

  list() {
    return this.projectRepository.list();
  }

  insert(entity: Partial<Project>) {
    return this.projectRepository.insert(entity);
  }

  update(id: number, entity: Partial<Project>): Observable<Project> {
    return this.projectRepository.update(id, entity);
  }

  delete(id: number) {
    return this.projectRepository.delete(id);
  }

  page(pageIndex: number, pageSize: number): Observable<any> {
    return this.projectRepository.page(pageIndex, pageSize);
  }
} */
