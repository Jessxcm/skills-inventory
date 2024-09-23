import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private fb: FormBuilder) {}

  registerForm = this.fb.nonNullable.group(
    {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [this.matchValidator('password', 'confirmPassword')],
    }
  );

  validateConfirmPassword(control: AbstractControl): ValidationErrors | null {
    const parent = control.parent;

    if (!parent) return null;
    const sourceControl = control.get('password');
    const targetControl = control.get('confirmPassword');

    if (!sourceControl || !targetControl) return null;
    if (sourceControl.value !== targetControl.value) {
      targetControl.setErrors({ mismatch: true });
      return { confirmNotMatch: true };
    } else {
      targetControl.setErrors(null);
      return null;
    }

    /*  return null;


      return (control: AbstractControl) => {
        const sourceControl = control.get(source)!;
        const targetControl = control.get(target)!;
        if (targetControl.errors && !targetControl.errors.mismatch) {
          return null;
        }
        if (sourceControl.value !== targetControl.value) {
          targetControl.setErrors({ mismatch: true });
          return { mismatch: true };
        } else {
          targetControl.setErrors(null);
          return null;
        }
      }; */
  }

  matchValidator(source: string, target: string) {
    return (control: AbstractControl) => {
      const sourceControl = control.get(source)!;
      const targetControl = control.get(target)!;
      if (targetControl.errors && !targetControl.errors.mismatch) {
        return null;
      }
      if (sourceControl.value !== targetControl.value) {
        targetControl.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        targetControl.setErrors(null);
        return null;
      }
    };
  }
}
