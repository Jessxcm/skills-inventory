import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseInfrastructure } from '@core/infrastructure/base-infrastructure';
import { StorageApplication } from '../../auth/application/storage-application';
import { Project } from '../domain/entities/project';
import { ProjectRepository } from '../domain/repositories/project-repository';

@Injectable()
export class ProjectInfrastructure
  extends BaseInfrastructure<Project>
  implements ProjectRepository
{
  constructor(http: HttpClient, storageApplication: StorageApplication) {
    // TODO: Aquí debo cambiar el endpoint 'drivers' por el endpoint 'projects' cuando en backend lo tenga listo
    super(http, storageApplication, 'drivers');
  }

  /*
  private accessToken = this.storageApplication.getField('accessToken-test');
  constructor(
    private readonly http: HttpClient,
    private readonly storageApplication: StorageApplication
  ) {}

   list(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.apiPath}/drivers`, {
      headers: { authorization: 'Bearer ' + this.accessToken },
    });
  }

  listOne(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

  insert(entity: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(`${environment.apiPath}/drivers`, entity, {
      headers: { authorization: 'Bearer ' + this.accessToken },
    });
  }

  update(id: number, entity: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${environment.apiPath}/drivers/${id}`, entity, {
      headers: { authorization: 'Bearer ' + this.accessToken },
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Project>(`${environment.apiPath}/drivers/${id}`, {
      headers: { authorization: 'Bearer ' + this.accessToken },
    });
  }

  page(pageIndex: number, pageSize: number): Observable<ResultPage<Project>> {
    return this.http.get<ResultPage<Project>>(
      `${environment.apiPath}/drivers/page/${pageIndex}/${pageSize}`,
      { headers: { authorization: 'Bearer ' + this.accessToken } }
    );
  } */
}
