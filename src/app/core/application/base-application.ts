import { BaseMethods } from '@core/domain/base-methods-interface';
import { Observable } from 'rxjs';

export abstract class BaseApplication<Entity, Repository extends BaseMethods<Entity>> {
  constructor(private repository: Repository) {}
  list(): Observable<Entity[]> {
    return this.repository.list();
  }

  listRandomUsers(): Observable<Entity[]> {
    return this.repository.listRandomUsers();
  }

  insert(entity: Partial<Entity>) {
    return this.repository.insert(entity);
  }

  update(id: number, entity: Partial<Entity>): Observable<Entity> {
    return this.repository.update(id, entity);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }

  page(pageIndex: number, pageSize: number): Observable<any> {
    return this.repository.page(pageIndex, pageSize);
  }

  /* Fake */
  listFake(): Observable<Entity[]> {
    return this.repository.listFake();
  }

  insertFake(entity: Partial<Entity>) {
    return this.repository.insertFake(entity);
  }

  updateFake(id: number, entity: Partial<Entity>) {
    return this.repository.updateFake(id, entity);
  }
}
