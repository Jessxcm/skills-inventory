import { Auth, AuthProperties } from './auth';

export class AuthFactory {
  static create(correo: string, password: string): Auth {
    const recaptchaReactive = 'abc';
    const authProperties: AuthProperties = {
      correo,
      password,
      recaptchaReactive,
    };

    // Reglas del negocio
    if (correo.trim() === '') {
      throw new Error('Please enter email');
    }
    if (password.trim() === '') {
      throw new Error('Please enter password');
    }

    return new Auth(authProperties);
  }
}
