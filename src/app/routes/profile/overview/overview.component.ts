import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '@shared/services/utils.service';

import { AuthService, User } from '@core/authentication';
import { TranslateService } from '@ngx-translate/core';
import { Messages } from '@shared/classes/base-collaborators';
import { CollaboratorApplication } from 'app/routes/collaborators/application/collaborator-application';
import { FormSkillComponent } from 'app/routes/skills/views/form-skill/form-skill.component';
import { ToastrService } from 'ngx-toastr';
import { CollaboratorEntity } from '../../collaborators/domain/entities/collaborator-entity';
import { ProfileLayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class ProfileOverviewComponent implements OnInit {
  messages: Messages = {
    confirm: 'status_messages.confirmation_question',
    insert: 'status_messages.added',
    update: 'status_messages.updated',
    delete: 'status_messages.deleted',
  };
  @Output() newItemEvent = new EventEmitter<CollaboratorEntity>();

  icon_header = 'toys';
  title_header!: string;
  reactiveFormBasicInformation!: FormGroup;
  reactiveFormJob!: FormGroup;
  totalRecords = 0;
  collaborator!: CollaboratorEntity;
  user!: User;
  isSaveBasicInformation!: boolean;
  SKILLS: any[] = [];

  events = [
    {
      id: 0,
      title: 'My last travel',
      content: 'There are so much countries in the world...',
      date: '2016 - 2019',
      icon: 'https://image.flaticon.com/icons/svg/214/214335.svg',
    },
    {
      id: 1,
      title: 'My Job',
      content: 'The best job I could possibly get!',
      date: '2015 - 2016',
      icon: 'https://image.flaticon.com/icons/svg/1006/1006517.svg',
    },
    {
      id: 2,
      title: 'My Education',
      content: 'This is the university I went...',
      date: '2011',
      icon: 'https://image.flaticon.com/icons/svg/1141/1141771.svg',
    },
  ];

  LANGUAGES: any[] = [
    {
      name: 'English',
      general: 'C1',
      speaking: 'C1',
      writting: 'B2',
      listening: 'C1',
      reading: 'C1',
    },
    {
      name: 'Spanish',
      general: 'C2',
      speaking: 'C2',
      writting: 'C2',
      listening: 'C2',
      reading: 'C2',
    },
    {
      name: 'French',
      general: 'B1',
      speaking: 'A2',
      writting: 'B1',
      listening: 'A2',
      reading: 'B1',
    },
  ];
  PROJECTS: any[] = [];

  displayedColumns: string[] = ['name', 'experience', 'type', 'level', 'options'];
  dataSkills = [...this.SKILLS];

  projectsColumns: string[] = [
    'id',
    'projectName',
    'projectLeader',
    'commencementDate',
    'completionDate',
    'ProjectStatus',
    'options',
  ];

  dataProjects = [...this.PROJECTS];

  dataLanguages = [...this.LANGUAGES];
  displayedColumns2: string[] = [
    'language',
    'general',
    'speaking',
    'writting',
    'listening',
    'reading',
    'options',
  ];

  studiesColumns: string[] = [
    'id',
    'title',
    'startDate',
    'endDate',
    'status',
    'institution',
    'options',
  ];
  STUDIES: any[] = [];
  dataStudies = [...this.STUDIES];

  constructor(
    private fb: FormBuilder,
    private utilsSvc: UtilsService,
    private auth: AuthService,
    protected toast: ToastrService,
    protected translate: TranslateService,
    private collaboratorApplication: CollaboratorApplication,
    @Inject(ProfileLayoutComponent) private profileLayoutComponent: ProfileLayoutComponent
  ) {}

  ngOnInit(): void {
    this.auth.user().subscribe(user => (this.user = user));

    this.collaborator = this.utilsSvc.getCollaborator();
    this.dataSkills = this.collaborator?.skills;
    this.dataStudies = this.collaborator?.studies;
    this.dataProjects = this.collaborator?.projects;

    this.icon_header = this.collaborator ? 'edit' : 'add';
    this.title_header = this.collaborator ? 'Edit' : 'New';
    this.newItemEvent.emit(this.collaborator);

    console.log('collaborator', this.collaborator);

    this.initForms();
  }

  private initForms() {
    this.reactiveFormBasicInformation = this.fb.nonNullable.group({
      id: this.collaborator?.id,
      username: [this.collaborator?.login?.username, [Validators.required]],
      name: [this.collaborator?.name?.first, [Validators.required]],
      lastname: [this.collaborator?.name?.last, [Validators.required]],
      email: [this.collaborator?.email, [Validators.required, Validators.email]],
      gender: [this.collaborator?.gender, [Validators.required]],
      documentType: [this.collaborator?.document?.type, [Validators.required]],
      civilStatus: [this.collaborator?.civilStatus, [Validators.required]],
      documentNumber: [this.collaborator?.document?.number, [Validators.required]],
      country: [this.collaborator?.location?.country, [Validators.required]],
      citizenship: [this.collaborator?.citizenship, [Validators.required]],
      state: [this.collaborator?.location?.state, [Validators.required]],
      city: [this.collaborator?.location?.city, [Validators.required]],
      address: [this.collaborator?.location?.street?.name, [Validators.required]],
      mobile: [this.collaborator?.phone, [Validators.required]],
      tele: [this.collaborator?.cell, [Validators.required]],
      birthdate: [this.collaborator?.dob?.date, [Validators.required]],
      /* linkedin: [this.collaborator?.social?.linkedin, [Validators.required]], */
    });

    this.reactiveFormJob = this.fb.nonNullable.group({
      position: [this.collaborator?.job?.position, [Validators.required]],
      salary: [this.collaborator?.job?.salary, [Validators.required]],
      pension: [this.collaborator?.job?.pension, [Validators.required]],
      rh: [this.collaborator?.job?.rh, [Validators.required]],
      eps: [this.collaborator?.job?.eps, [Validators.required]],
      cesantias: [this.collaborator?.job?.cesantias, [Validators.required]],
      dateAdmission: [this.collaborator?.job?.dateAdmission, [Validators.required]],
      status: [this.collaborator?.job?.status, [Validators.required]],
    });

    if (this.collaborator?.id) this.isSaveBasicInformation = true;
  }

  getErrorMessage(form: FormGroup) {
    return form.get('email')?.hasError('required')
      ? 'You must enter a value'
      : form.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getTotalRecords() {
    this.collaboratorApplication.listFake().subscribe({
      next: (collaborators: any) => {
        this.totalRecords = collaborators.length - 1;
        console.log(this.totalRecords);
        //this.dataSource = collaborators.results;
      },
      error: err => {
        console.log('Error', err);
      },
    });
  }

  saveRecordBasicInformation() {
    if (this.reactiveFormBasicInformation.invalid)
      return this.reactiveFormBasicInformation.markAllAsTouched(); // Activo todos los errores

    const collaboratorData = this.reactiveFormBasicInformation.value;
    const id = collaboratorData.id;
    //delete collaboratorData.id;

    if (id) {
      // Update entity
      // Crea una instancia de Collaborator y asigna los valores
      const record: CollaboratorEntity = {
        id: collaboratorData.id,
        skills: this.collaborator.skills,
        projects: this.collaborator.projects,
        gender: collaboratorData.gender,
        name: {
          first: collaboratorData.name,
          last: collaboratorData.lastname,
        },
        civilStatus: collaboratorData.civilStatus,
        job: {
          position: collaboratorData.position,
          eps: collaboratorData.eps,
          pension: collaboratorData.pension,
          cesantias: collaboratorData.cesantias,
          rh: collaboratorData.rh,
          salary: collaboratorData.salary,
          dateAdmission: collaboratorData.dateAdmission,
          status: collaboratorData.status,
        },
        location: {
          street: {
            number: this.collaborator.location.street.number,
            name: this.collaborator.location.street.name,
          },
          city: collaboratorData.city,
          state: collaboratorData.state,
          country: collaboratorData.country,
          postcode: this.collaborator.location.postcode,
        },
        citizenship: collaboratorData.citizenship,
        email: collaboratorData.email,
        login: {
          username: collaboratorData.username,
          password: this.collaborator.login.password,
        },
        dob: {
          date: this.collaborator.dob.date,
          age: this.collaborator.dob.age,
        },
        registered: {
          date: this.collaborator.registered.date,
          age: this.collaborator.registered.age,
        },
        phone: collaboratorData.mobile,
        cell: collaboratorData.tele,
        document: {
          type: collaboratorData.documentType,
          number: collaboratorData.documentNumber,
        },
        picture: {
          large: this.collaborator.picture.large,
          medium: this.collaborator.picture.medium,
          thumbnail: this.collaborator.picture.thumbnail,
        },
        studies: this.collaborator.studies,
      };

      this.collaboratorApplication.updateFake(id, record).subscribe({
        next: () => {
          this.toast.success(this.translate.instant(this.messages.update));
        },
      });
    } else {
      let pictures;
      if (collaboratorData.gender == 'female') {
        pictures = [
          'https://randomuser.me/api/portraits/women/65.jpg',
          'https://randomuser.me/api/portraits/women/10.jpg',
          'https://randomuser.me/api/portraits/women/75.jpg',
          'https://randomuser.me/api/portraits/women/63.jpg',
        ];
      } else {
        pictures = [
          'https://randomuser.me/api/portraits/men/73.jpg',
          'https://randomuser.me/api/portraits/men/20.jpg',
          'https://randomuser.me/api/portraits/men/43.jpg',
          'https://randomuser.me/api/portraits/men/36.jpg',
        ];
      }

      const random = Math.floor(Math.random() * pictures.length);
      const picture = pictures[random];
      console.log(picture);
      // New entity
      // Obtengo el total de registro para generar un id
      this.getTotalRecords();
      // Crea una instancia de Collaborator y asigna los valores
      const record = {
        id: this.totalRecords + 1,
        skills: [],
        projects: [],
        gender: collaboratorData.gender,
        name: {
          first: collaboratorData.name,
          last: collaboratorData.lastname,
        },
        civilStatus: collaboratorData.civilStatus,
        job: {
          position: collaboratorData.position || '',
          cesantias: collaboratorData.cesantias || '',
          pension: collaboratorData.pension || '',
          eps: collaboratorData.eps || '',
          rh: collaboratorData.rh || '',
          salary: collaboratorData.salary || '',
          dateAdmission: collaboratorData.dateAdmission || '',
          status: collaboratorData.status || '',
        },
        location: {
          street: {
            number: 3871,
            name: 'Main Road',
          },
          city: collaboratorData.city,
          state: collaboratorData.state,
          country: collaboratorData.country,
          postcode: 48787,
        },
        citizenship: collaboratorData.citizenship,
        email: collaboratorData.email,
        login: {
          username: collaboratorData.username,
          password: 'helium',
        },
        dob: {
          date: '1963-11-22T13:15:52.990Z',
          age: 59,
        },
        registered: {
          date: '2012-10-03T13:40:35.271Z',
          age: 10,
        },
        phone: collaboratorData.mobile,
        cell: collaboratorData.tele,
        document: {
          type: collaboratorData.documentType,
          number: collaboratorData.documentNumber,
        },
        picture: {
          large: picture,
          medium: picture,
          thumbnail: picture,
        },
        studies: this.collaborator.studies,
      };

      this.collaboratorApplication.insertFake(record).subscribe({
        next: () => {
          this.toast.success(this.translate.instant(this.messages.insert));
          //this.collaborator.id = this.totalRecords;
          this.collaborator = record;
          this.isSaveBasicInformation = true;

          // Provider para que se cargue el componente de perfil con el colaborador recien registrado
          this.profileLayoutComponent.collaborator = this.collaborator;

          console.log('data collaborator registrado', this.collaborator);
        },
      });
    }
  }

  saveRecordJob() {
    if (this.reactiveFormJob.invalid) return this.reactiveFormJob.markAllAsTouched(); // Activo todos los errores

    const jobData = this.reactiveFormJob.value;
    const id = this.collaborator.id;

    this.collaborator.job = jobData;
    const record = this.collaborator;
    // Update entity

    this.collaboratorApplication.updateFake(id, record).subscribe({
      next: () => {
        this.toast.success(this.translate.instant(this.messages.update));
      },
    });
  }

  openForm() {
    const reference = this.utilsSvc.openForm(FormSkillComponent, '500px', 'Hello');

    reference.subscribe(response => {
      console.log('response', response);

      if (!response) return;

      const idSkill = response.id;
      //delete response.id;

      if (idSkill) {
        // Update entity
        console.log('Update Skill');

        /* this.application.update(id, response).subscribe({
          next: () => {
            this.changePage(objectPaginationWithCurrentPage);
            this.toast.success(this.translate.instant(this.messages.update));
          },
        }); */
      } else {
        // New entity
        console.log('New Skill');
        const id = this.collaborator?.skills.length + 1;
        response.data.id = id;
        this.collaborator.skills.push(response.data);
        this.dataSkills = [...this.collaborator.skills];

        /* this.application.insert(response).subscribe({
          next: () => {
            this.changePage(objectPaginationWithCurrentPage);
            this.toast.success(this.translate.instant(this.messages.insert));
          },
        }); */
      }
    });
  }
}
