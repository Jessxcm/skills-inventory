import { Inject, Injectable } from '@angular/core';
import { BaseApplication } from '@core/application/base-application';
import { RoleEntity } from '../domain/entities/role-entity';
import { RoleRepository } from '../domain/repositories/role-repository';
import { RoleInfrastructure } from '../infrastructure/role-infrastructure';

@Injectable()
export class RoleApplication extends BaseApplication<RoleEntity, RoleRepository> {
  constructor(@Inject(RoleInfrastructure) private readonly roleRepository: RoleRepository) {
    super(roleRepository);
  }
}
