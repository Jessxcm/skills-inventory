import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-medics-views-form-medic',
  templateUrl: './form-medic.component.html',
  styleUrls: ['./form-medic.component.scss'],
})
export class FormMedicComponent {
  icon_header = 'toys';
  title_header: string;
  form!: FormGroup;
  photoToShow = '';

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private reference: MatDialogRef<FormMedicComponent>
  ) {
    this.title_header = data ? 'Edit' : 'New'; // TODO: Estos textos deben ser dinámicos.
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.nonNullable.group({
      id: this.data?.id,
      nombre: [this.data?.nombre, [Validators.required, Validators.maxLength(20)]],
      segundo_nombre: [this.data?.segundo_nombre, [Validators.required, Validators.maxLength(20)]],
      apellido: [this.data?.apellido, [Validators.required, Validators.maxLength(20)]],
      cmp: [this.data?.cmp, [Validators.required, Validators.maxLength(20)]],
      dni: [this.data?.dni, [Validators.required, Validators.maxLength(20)]],
      correo: [this.data?.correo, [Validators.required, Validators.email]],
    });

    // Se agrega un control "foto" solo si no hay datos en la variable "data".
    // De lo contrari o, se agrega el control sin ninguna validación específica.
    if (this.data) {
      this.form.addControl('foto', new FormControl());
      this.photoToShow = this.data.foto ? this.data.foto : '';
    } else {
      this.form.addControl('foto', new FormControl(null, Validators.required));
    }
  }

  save() {
    const record = this.form.value;
    const recordId = record.id;
    delete record.id;

    const formData = new FormData();
    for (const key of Object.keys(record)) {
      if (key === 'foto' && record[key]) {
        formData.append(key, record[key]);
      } else if (key !== 'foto') {
        formData.append(key, record[key]);
      }
    }

    this.reference.close({ id: recordId, data: formData });
  }
}
