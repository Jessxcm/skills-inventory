import { BaseInfrastructure } from '@core/infrastructure/base-infrastructure';
import { RoleEntity } from '../domain/entities/role-entity';
import { RoleRepository } from '../domain/repositories/role-repository';
import { HttpClient } from '@angular/common/http';
import { StorageApplication } from '../../auth/application/storage-application';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleInfrastructure extends BaseInfrastructure<RoleEntity> implements RoleRepository {
  constructor(http: HttpClient, StorageApplication: StorageApplication) {
    super(http, StorageApplication, 'roles');
  }
}
