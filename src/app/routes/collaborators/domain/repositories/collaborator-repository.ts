import { BaseMethods } from '@core/domain/base-methods-interface';
import { CollaboratorEntity } from '../entities/collaborator-entity';

export type CollaboratorRepository = BaseMethods<CollaboratorEntity>;

/* export interface CollaboratorRepository {
  list(): Observable<any[]>;
}
 */
