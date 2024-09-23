import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleApplication } from 'app/routes/roles/application/role-application';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent {
  icon_header = 'toys';
  title_header: string;
  reactiveForm!: FormGroup;
  roles!: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private reference: MatDialogRef<FormUserComponent>,
    private readonly roleApplication: RoleApplication
  ) {
    this.title_header = data ? 'Edit' : 'New'; // TODO: Estos textos deben ser dinámicos.

    this.initForm();
    this.loadRoles();
  }

  private initForm(): void {
    this.reactiveForm = this.fb.nonNullable.group({
      id: this.data?.id,
      nombre: [this.data?.nombre, [Validators.required, Validators.maxLength(20)]],
      correo: [
        this.data?.correo,
        [Validators.required, Validators.maxLength(50), Validators.email],
      ],
      roles: [this.data?.roles.map((role: any) => role.id), [Validators.required]],
    });

    // Si es un nuevo registro, agrega un campo para la contraseña y debe ser obligatorio.
    if (!this.data) {
      this.reactiveForm.addControl('password', new FormControl('', [Validators.required]));
    } else {
      // Si es un registro existente, no debe ser obligatorio el campo de contraseña.
      this.reactiveForm.addControl('password', new FormControl(''));
    }
  }

  private loadRoles(): void {
    this.roles = this.roleApplication.list();
  }

  save() {
    const record = this.reactiveForm.value;
    const recordId = record.id;
    delete record.id;

    if (this.data && !record.password) {
      delete record.password;
    }

    this.reference.close({ id: recordId, data: record });
  }
}
