import { Inject, Injectable } from '@angular/core';
import { BaseApplication } from '@core/application/base-application';
import { SkillEntity } from '../domain/entities/skill-entity';
import { SkillRepository } from '../domain/repositories/skill-repository';
import { SkillInfrastructure } from '../infrastructure/skill-infrastructure';

@Injectable()
export class SkillApplication extends BaseApplication<SkillEntity, SkillRepository> {
  constructor(@Inject(SkillInfrastructure) private readonly skillRepository: SkillRepository) {
    super(skillRepository);
  }
}
