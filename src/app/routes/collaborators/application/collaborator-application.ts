import { Inject, Injectable } from '@angular/core';
import { BaseApplication } from '@core/application/base-application';
import { CollaboratorEntity } from '../domain/entities/collaborator-entity';
import { CollaboratorRepository } from '../domain/repositories/collaborator-repository';
import { CollaboratorInfrastructure } from '../infrastructure/collaborator-infrastructure';

@Injectable()
export class CollaboratorApplication extends BaseApplication<
  CollaboratorEntity,
  CollaboratorRepository
> {
  constructor(
    @Inject(CollaboratorInfrastructure)
    private readonly collaboratorRepository: CollaboratorRepository
  ) {
    super(collaboratorRepository);
  }
}
/* @Injectable()
export class CollaboratorApplication {
  constructor(
    @Inject(CollaboratorInfrastructure)
    private readonly collaboratorRepository: CollaboratorRepository
  ) {}

  list(): Observable<any[]> {
    return this.collaboratorRepository.list();
  }
}
 */
