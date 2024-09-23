import { BaseMethods } from '@core/domain/base-methods-interface';
import { UserEntity } from '../entities/user-entity';

export type UserRepository = BaseMethods<UserEntity>;
