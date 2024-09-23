import { RoleEntity, RoleProperties } from './entities/role-entity';

export class RoleFactory {
  static create(rol: string): RoleEntity {
    const roleProperties: RoleProperties = {
      rol,
    };

    if (rol.trim() === '') {
      throw new Error('Role is required');
    }

    return new RoleEntity(roleProperties);
  }
}
