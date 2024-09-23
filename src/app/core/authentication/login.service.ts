import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Menu } from '@core';
import { StorageRepository } from 'app/routes/auth/domain/storage-repository';
import { StorageInfrastructure } from 'app/routes/auth/infrastructure/storage-infrastructure';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token, User } from './interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    protected http: HttpClient,
    @Inject(StorageInfrastructure) private readonly storageRepository: StorageRepository
  ) {}

  login(email: string, password: string, rememberMe = false): Observable<Token> {
    return this.http.post<Token>('/auth/login', { email, password, rememberMe });
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    this.storageRepository.clear(); // TODO: Es debo quitarlo cuando termine la app, ya que lo uso para limpiar los accesTokenTest y RefreshTokenTest
    return this.http.post<any>('/auth/logout', {});
  }

  me() {
    return this.http.get<User>('/me');
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
