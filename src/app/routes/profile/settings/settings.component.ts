import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  icon_header = 'toys';
  title_header!: string;
  reactiveForm!: FormGroup;
  collaborator: any;

  constructor(private fb: FormBuilder, private utilsSvc: UtilsService) {}

  ngOnChanges(): void {}

  ngOnInit(): void {
    this.collaborator = this.utilsSvc.getCollaborator();
    this.icon_header = this.collaborator ? 'edit' : 'add';
    this.title_header = this.collaborator ? 'Edit' : 'New';
    console.log('collaborator', this.collaborator);

    this.initForm();
  }

  private initForm() {
    this.reactiveForm = this.fb.nonNullable.group({
      username: [this.collaborator?.login?.username, [Validators.required]],
      email: [this.collaborator?.email, [Validators.required, Validators.email]],
      gender: [this.collaborator?.gender, [Validators.required]],
      city: [this.collaborator?.location?.city, [Validators.required]],
      address: [this.collaborator?.location?.street?.name, [Validators.required]],
      company: [this.collaborator?.location?.state, [Validators.required]],
      mobile: [this.collaborator?.phone, [Validators.required]],
      tele: [this.collaborator?.cell, [Validators.required]],
      website: ['', [Validators.required]],
      date: [this.collaborator?.dob, [Validators.required]],
    });
  }

  getErrorMessage(form: FormGroup) {
    return form.get('email')?.hasError('required')
      ? 'You must enter a value'
      : form.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
