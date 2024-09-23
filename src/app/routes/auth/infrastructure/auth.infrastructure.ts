import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../domain/auth';
import { AuthRepository } from '../domain/auth.repository';
import { ITokens } from '../domain/token.interface';
import { environment } from '@env/environment';

@Injectable()
export class AuthInfrastructure implements AuthRepository {
  private http = inject(HttpClient);

  login(auth: Auth): Observable<ITokens> {
    return this.http.post<ITokens>('https://api-cursoangular.cursos-dev.com/users/login', auth);
  }

  getNewAccessToken(refreshToken: string): Observable<ITokens> {
    return this.http.get<ITokens>(`${environment.apiPath}/users/refresh/${refreshToken}`);
  }
}
