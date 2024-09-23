import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication';
import { AuthFactory } from 'app/routes/auth/domain/auth.factory';
import { filter } from 'rxjs';
import { AuthApplication } from '../../auth/application/auth.application';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSubmitting = false;
  visiblePassword = false;
  domainsAllowed = ['dreamcodesoft.com', 'correo.com', 'gmail.com'];
  date: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private authApplication: AuthApplication
  ) {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.nonNullable.group({
      email: [
        'nestor.martinez@dreamcodesoft.com',
        [Validators.required, this.getValidateEmailDomain(this.domainsAllowed)],
      ],
      password: ['ng-dreamcode', [Validators.required]],
      recaptcha: [null, [Validators.required]],
      rememberMe: [false],
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get recaptcha() {
    return this.loginForm.get('recaptcha')!;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }

  getValidateEmailDomain(domainsAllowed: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const email = (control.value as string).toLowerCase();
      const isUsingDomainAllowed = domainsAllowed.some(domain => email.endsWith(domain));

      return isUsingDomainAllowed ? null : { invalidEmailDomain: true };
    };
  }

  login() {
    //TODO: Eliminar este login y todo lo relacionado a el cuando finalice el curso de angular 14
    // Esto es solo para ensayar interceptors, storage, guards
    this.loginAppAmbulance();

    // Version Oficial
    this.isSubmitting = true;
    if (this.loginForm.valid) {
      this.auth
        .login(this.email.value, this.password.value, this.rememberMe.value)
        .pipe(filter(authenticated => authenticated))
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/');
          },
          error: (errorRes: HttpErrorResponse) => {
            if (errorRes.status === 422) {
              const form = this.loginForm;
              const errors = errorRes.error.errors;
              Object.keys(errors).forEach(key => {
                form.get(key === 'email' ? 'email' : key)?.setErrors({
                  remote: errors[key][0],
                });
              });
            }

            this.isSubmitting = false;
          },
        });
    }
  }

  private loginAppAmbulance(): void {
    const auth = {
      correo: 'sergio@correo.com',
      password: '123',
      recaptchaReactive: this.loginForm.get('recaptcha')?.value,
    };
    //const auth = AuthFactory.create(credentials.correo, credentials.password);

    this.authApplication.login(auth);
  }
}
