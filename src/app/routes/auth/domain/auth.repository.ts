import { Observable } from 'rxjs';
import { Auth } from './auth';
import { ITokens } from './token.interface';

export interface AuthRepository {
  login(auth: any): Observable<ITokens>;
  getNewAccessToken(refreshToken: string): Observable<ITokens>;
}
