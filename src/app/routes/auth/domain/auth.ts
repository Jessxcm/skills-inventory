interface AuthEssentials {
  correo: string;
  password: string;
}
interface AuthOptionals {
  recaptchaReactive: string;
}

export type AuthProperties = Required<AuthEssentials> & Partial<AuthOptionals>;

export class Auth {
  private readonly correo!: string;
  private password!: string;
  private recaptchaReactive!: string;

  constructor(properties: AuthProperties) {
    Object.assign(this, properties);
  }

  properties(): AuthProperties {
    return {
      correo: this.correo,
      password: this.password,
      recaptchaReactive: this.recaptchaReactive,
    };
  }
}
