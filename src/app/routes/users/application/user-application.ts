import { Inject, Injectable } from '@angular/core';
import { BaseApplication } from '@core/application/base-application';
import { UserEntity } from '../domain/entities/user-entity';
import { UserRepository } from '../domain/repositories/user-repository';
import { UserInfrastructure } from '../infrastructure/user-infrastructure';

@Injectable()
export class UserApplication extends BaseApplication<UserEntity, UserRepository> {
  constructor(@Inject(UserInfrastructure) private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
