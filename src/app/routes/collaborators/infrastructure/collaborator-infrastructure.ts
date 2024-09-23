import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseInfrastructure } from '@core/infrastructure/base-infrastructure';
import { CollaboratorEntity } from '../domain/entities/collaborator-entity';
import { StorageApplication } from 'app/routes/auth/application/storage-application';
import { CollaboratorRepository } from '../domain/repositories/collaborator-repository';

@Injectable()
export class CollaboratorInfrastructure
  extends BaseInfrastructure<CollaboratorEntity>
  implements CollaboratorRepository
{
  constructor(http: HttpClient, storageApplication: StorageApplication) {
    super(http, storageApplication, '?results=120');
    console.log('prueba');
  }
}
/* @Injectable()
export class CollaboratorInfrastructure {
  private http = inject(HttpClient);
  private endPoint = '?results=120';

  list(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPathRandomUser}/${this.endPoint}`);
  }
} */
