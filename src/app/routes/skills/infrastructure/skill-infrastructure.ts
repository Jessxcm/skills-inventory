import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseInfrastructure } from '@core/infrastructure/base-infrastructure';
import { StorageApplication } from 'app/routes/auth/application/storage-application';
import { SkillEntity } from '../domain/entities/skill-entity';
import { SkillRepository } from '../domain/repositories/skill-repository';

@Injectable()
export class SkillInfrastructure
  extends BaseInfrastructure<SkillEntity>
  implements SkillRepository
{
  constructor(http: HttpClient, storageApplication: StorageApplication) {
    // TODO: Aquí debo cambiar el endpoint 'drivers' por el endpoint 'skills' cuando en backend lo tenga listo
    super(http, storageApplication, 'skills');
  }
}
