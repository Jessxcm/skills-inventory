import { Observable } from 'rxjs';

export interface ResultPage<Entity> {
  records: Entity[];
  totalRecords: number;
}

// TODO: Esta interfaz tiene los métodos cómunes de un crud y que normalmente se crean en los repository
export interface BaseMethods<Entity> {
  list(): Observable<Entity[]>;
  listRandomUsers(): Observable<Entity[]>;
  listOne(id: number): Observable<any>;
  insert(entity: Partial<Entity>): Observable<Entity>;
  update(id: number, entity: Partial<Entity>): Observable<Entity>;
  delete(id: number): Observable<any>;
  page(page: number, pageSize: number): Observable<ResultPage<Entity>>;

  /* Fake */
  listFake(): Observable<Entity[]>;
  insertFake(entity: Partial<Entity>): Observable<Entity>;
  updateFake(id: number, entity: Partial<Entity>): Observable<Entity>;
}
