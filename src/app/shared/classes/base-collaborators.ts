import { BaseApplication } from '@core/application/base-application';
import { BaseMethods } from '@core/domain/base-methods-interface';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '@shared/services/utils.service';
import { CollaboratorEntity } from 'app/routes/collaborators/domain/entities/collaborator-entity';
import { ToastrService } from 'ngx-toastr';

export type Messages = {
  confirm: string;
  insert: string;
  update: string;
  delete: string;
};

export abstract class BaseCollaborators<Entity, Repository extends BaseMethods<Entity>> {
  abstract icon_header: string;
  abstract title_header: string;
  abstract messages: Messages;

  totalRecords = 0;
  dataSource: Entity[] = [];
  dataSourceClone: Entity[] = [];

  users!: CollaboratorEntity[];
  filteredCollaborators!: any[];

  constructor(
    protected application: BaseApplication<Entity, Repository>,
    protected utilsSvc: UtilsService,
    protected toast: ToastrService,
    protected translate: TranslateService
  ) {
    this.getAll();
  }

  getAll() {
    this.application.listFake().subscribe({
      next: (collaborators: any) => {
        this.users = collaborators;
        this.filteredCollaborators = collaborators.slice(); // inicia con todos los usuarios
        this.totalRecords = collaborators.length;

        //this.dataSource = collaborators.results;
      },
      error: err => {
        console.log('Error', err);
      },
    });
  }

  /* delete(id: number, record = '') {
    const confirmMessage = [this.messages.confirm, record];
    this.utilsSvc.confirm(confirmMessage).subscribe(response => {
      if (response) {
        this.application.delete(id).subscribe({
          next: () => {
            this.changePage(objectPaginationWithCurrentPage);
            this.toast.success(this.translate.instant(this.messages.delete));
          },
        });
      }
    });
  } */
}
