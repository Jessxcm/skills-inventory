import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseCollaborators, Messages } from '@shared/classes/base-collaborators';
import { UtilsService } from '@shared/services/utils.service';
import { DashboardService } from 'app/routes/dashboard/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { CollaboratorApplication } from '../../application/collaborator-application';
import { CollaboratorEntity } from '../../domain/entities/collaborator-entity';
import { CollaboratorRepository } from '../../domain/repositories/collaborator-repository';

@Component({
  selector: 'app-collaborators-views-list-collaborators',
  templateUrl: './list-collaborators.component.html',
  styleUrls: ['./list-collaborators.component.scss'],
  providers: [DashboardService],
})
export class CollaboratorsViewsListCollaboratorsComponent extends BaseCollaborators<
  CollaboratorEntity,
  CollaboratorRepository
> {
  icon_header = 'people';
  title_header = 'titles.collaborators';
  reactiveForm!: FormGroup;
  dataSource: CollaboratorEntity[] = [];

  totalRecords = 0;
  totalprueba = 0;
  showSummary = false;
  searchTerm = '';
  messages: Messages = {
    confirm: 'status_messages.confirmation_question',
    insert: 'status_messages.added',
    update: 'status_messages.updated',
    delete: 'status_messages.deleted',
  };

  constructor(
    protected readonly collaboratorApplication: CollaboratorApplication,
    protected utilsSvc: UtilsService,
    protected toast: ToastrService,
    protected translate: TranslateService,
    private router: Router,
    private fb: FormBuilder
  ) {
    super(collaboratorApplication, utilsSvc, toast, translate);
    this.initForm();
    this.getAll();
  }

  private initForm() {
    this.reactiveForm = this.fb.nonNullable.group({
      showSummary: [false],
      searchTerm: [''],
    });
    this.reactiveForm.valueChanges.subscribe(() => this.filterCollaborators());
  }

  goToProfile() {
    this.utilsSvc.setCollaborator();
    this.router.navigate(['/profile/overview']);
  }

  filterCollaborators() {
    // Update Switch
    this.showSummary = this.reactiveForm.controls.showSummary.value;

    // Update Search
    const searchTerm = this.reactiveForm.controls.searchTerm.value.toLowerCase();

    const searchTerms = searchTerm.split(' ');

    this.filteredCollaborators = this.users.filter(user => {
      const fullName = `${user.name!.first} ${user.name!.last}`.toLowerCase();
      const skills = user.skills || [];
      const skillNames = skills.map(skill => skill.name.toLowerCase());

      // Filter by specific skills
      const hasSpecificSkills = searchTerms.every((term: string) => {
        if (term.includes('-')) {
          const [skillName, experienceRequired] = term.split('-');
          const parsedExperienceRequired = parseInt(experienceRequired.trim());

          return skills.some(
            skill =>
              skill.name.toLowerCase().includes(skillName) &&
              skill.experience >= parsedExperienceRequired
          );
        } else {
          return skillNames.some(name => name.includes(term));
        }
      });

      return (
        fullName.includes(searchTerm) ||
        skillNames.some(name => name.includes(searchTerm)) ||
        hasSpecificSkills
      );
    });

    this.totalRecords = this.filteredCollaborators.length;
  }
}
