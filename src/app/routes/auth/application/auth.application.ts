import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../domain/auth';
import { AuthRepository } from '../domain/auth.repository';
import { StorageRepository } from '../domain/storage-repository';
import { ITokens } from '../domain/token.interface';
import { AuthInfrastructure } from '../infrastructure/auth.infrastructure';
import { StorageInfrastructure } from '../infrastructure/storage-infrastructure';
import { Observable } from 'rxjs';

@Injectable()
export class AuthApplication {
  private userLogged = false;

  constructor(
    @Inject(AuthInfrastructure) private readonly authRepository: AuthRepository,
    @Inject(StorageInfrastructure) private readonly storageRepository: StorageRepository,
    private router: Router
  ) {}

  login(auth: any) {
    this.authRepository.login(auth).subscribe({
      next: this.userAuthenticated.bind(this),
      error: this.showMessageError,
    });
  }

  private userAuthenticated(response: ITokens) {
    //console.log('✅ Teto', response);

    this.storageRepository.setStorage('accessToken-test', response.accessToken);
    this.storageRepository.setStorage('refreshToken-test', response.refreshToken);

    this.userLogged = true;
    this.router.navigateByUrl('/');
  }

  private showMessageError(error: any) {
    console.log('Error: ', error);
  }

  get isUserLogged(): boolean {
    const accessToken = this.storageRepository.getStorage('accessToken-test');

    return !!accessToken || this.userLogged;
  }

  logout() {
    this.userLogged = false;
    this.storageRepository.clear();
    //this.router.navigate(['/auth/login']);
    this.router.parseUrl('/auth/login');
  }

  getNewAccessToken(refreshToken: string): Observable<ITokens> {
    return this.authRepository.getNewAccessToken(refreshToken);
  }
}
