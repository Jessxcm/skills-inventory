import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SkillEntity } from '../../domain/entities/skill-entity';

enum SkillsLevels {
  Junior = 'Junior',
  Middle = 'Middle',
  Senior = 'Senior',
}

@Component({
  selector: 'app-form-skill',
  templateUrl: './form-skill.component.html',
  styleUrls: ['./form-skill.component.scss'],
})
export class FormSkillComponent {
  icon_header = 'toys';
  title_header: string;
  reactiveForm!: FormGroup;
  selectedLevel!: SkillsLevels;
  levels: SkillsLevels[] = [SkillsLevels.Junior, SkillsLevels.Middle, SkillsLevels.Senior];
  skill!: SkillEntity;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: SkillEntity,
    private reference: MatDialogRef<FormSkillComponent>
  ) {
    this.title_header = data ? 'Edit' : 'New'; // TODO: Estos textos deben ser dinámicos.
    //console.log('Row: ', data);

    this.initForm();
  }

  private initForm(): void {
    this.reactiveForm = this.fb.nonNullable.group({
      id: this.data?.id,
      name: ['React', [Validators.required, Validators.maxLength(20)]],
      experience: ['2', [Validators.required, Validators.min(1), Validators.max(40)]],
      type: ['Technical', [Validators.required]],
      /* level: ['Junior', [Validators.required]], */
    });
  }

  assignLevel() {
    const experience = this.reactiveForm.get('experience')?.value;

    this.selectedLevel =
      experience >= 0 && experience <= 2
        ? SkillsLevels.Junior
        : experience <= 5
        ? SkillsLevels.Middle
        : experience > 5
        ? SkillsLevels.Senior
        : SkillsLevels.Junior; // Valor predeterminado si experience no es válido

    this.reactiveForm.patchValue({ level: this.selectedLevel });
  }

  save() {
    this.assignLevel();
    const record = this.reactiveForm.value;
    console.log('this.reactiveForm.value', this.reactiveForm.value);
    this.skill = record;
    this.skill.level = this.selectedLevel;
    console.log('✅ Record: ', this.skill);
    const recordId = this.skill.id;

    //delete this.skill.id;
    /* let record = this.reactiveForm.value;
    this.skill = record;
    console.log('✅ Record: ', record);
    const recordId = record.id;
    delete record.id; */

    this.reference.close({ id: recordId, data: this.skill });
  }
}
