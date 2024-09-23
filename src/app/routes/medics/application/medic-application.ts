import { Inject, Injectable } from '@angular/core';
import { BaseApplication } from '@core/application/base-application';
import { Medic } from '../domain/medic';
import { MedicRepository } from '../domain/medic-repository';
import { MedicInfrastructure } from '../infrastructure/medic-infrastructure';

@Injectable()
export class MedicApplication extends BaseApplication<Medic, MedicRepository> {
  constructor(@Inject(MedicInfrastructure) private readonly medicRepository: MedicRepository) {
    super(medicRepository);
  }
}
