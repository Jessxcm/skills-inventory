import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseInfrastructure } from '@core/infrastructure/base-infrastructure';
import { StorageApplication } from 'app/routes/auth/application/storage-application';
import { UserEntity } from '../domain/entities/user-entity';
import { UserRepository } from '../domain/repositories/user-repository';

@Injectable()
export class UserInfrastructure extends BaseInfrastructure<UserEntity> implements UserRepository {
  constructor(http: HttpClient, storageApplication: StorageApplication) {
    super(http, storageApplication, 'users');
  }
}
