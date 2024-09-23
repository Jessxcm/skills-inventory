import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseInfrastructure } from '@core/infrastructure/base-infrastructure';
import { StorageApplication } from '../../auth/application/storage-application';

import { Medic } from '../domain/medic';
import { MedicRepository } from '../domain/medic-repository';

@Injectable()
export class MedicInfrastructure extends BaseInfrastructure<Medic> implements MedicRepository {
  constructor(http: HttpClient, storageApplication: StorageApplication) {
    super(http, storageApplication, 'medics');
  }
}
