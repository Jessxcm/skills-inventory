import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.scss'],
})
export class FormProjectComponent {
  icon_header = 'toys';
  title_header: string;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private reference: MatDialogRef<FormProjectComponent>
  ) {
    this.title_header = data ? 'Edit' : 'New'; // TODO: Estos textos deben ser dinámicos.
    //console.log('Row: ', data);

    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.nonNullable.group({
      id: this.data?.id,
      nombre: [this.data?.nombre, [Validators.required, Validators.maxLength(20)]],
    });
  }

  save() {
    const record = this.form.value;
    const recordId = record.id;
    delete record.id;

    this.reference.close({ id: recordId, data: record });
  }
}
