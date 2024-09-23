import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthApplication } from 'app/routes/auth/application/auth.application';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanLoad {
  constructor(private readonly _auth: AuthApplication, private router: Router) {}

  canActivate(): boolean {
    return this.validUserLogged();
  }

  canLoad(): boolean {
    return this.validUserLogged();
  }

  private validUserLogged(): boolean {
    const isLogged = this._auth.isUserLogged;
    console.log('isLogged', isLogged);

    if (!isLogged) this.router.navigate(['/auth/login']);

    return isLogged;
  }
}
