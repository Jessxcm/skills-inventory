import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  BaseHeaderComponent,
  ExportOptions,
  Messages,
  Modal,
} from '@shared/classes/base_component';
import { MetaData } from '@shared/models/meta-data';
import { UtilsService } from '@shared/services/utils.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectApplication } from '../../application/project-application';
import { Project } from '../../domain/entities/project';
import { ProjectRepository } from '../../domain/repositories/project-repository';
import { FormProjectComponent } from '../form-project/form-project.component';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss'],
})
export class ListProjectsComponent extends BaseHeaderComponent<Project, ProjectRepository> {
  icon_header = 'code';
  title_header = 'titles.projects';
  modal: Modal = {
    component: FormProjectComponent,
    width: '500px',
  };
  messages: Messages = {
    confirm: 'status_messages.confirmation_question',
    insert: 'status_messages.added',
    update: 'status_messages.updated',
    delete: 'status_messages.deleted',
  };
  // Está metadata es para visualizar todas las columnas en la web
  metaData: MetaData[] = [
    { columnDb: 'id', customTitleColumn: 'ID' },
    { columnDb: 'nombre', customTitleColumn: 'NOMBRE' },
    { columnDb: 'activo', customTitleColumn: 'ACTIVO' },
  ];

  // Está metadata es para exportar solamente las columnas necesarias
  metaDataExport: MetaData[] = [
    { columnDb: 'id', customTitleColumn: 'ID' },
    { columnDb: 'nombre', customTitleColumn: 'NOMBRE' },
  ];
  exportOptions: ExportOptions = {
    fileName: 'projects',
    sheetName: 'projects',
  };

  constructor(
    protected readonly projectApplication: ProjectApplication,
    protected readonly utilsSvc: UtilsService,
    protected toast: ToastrService,
    protected translate: TranslateService
  ) {
    super(projectApplication, utilsSvc, toast, translate);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();

    if (this.filterValue === '') {
      const objectPaginationWithCurrentPage = {
        previousPageIndex: 0,
        pageIndex: 0,
        pageSize: this.page_size,
        length: this.dataSource.length,
      };
      this.changePage(objectPaginationWithCurrentPage);
    } else {
      this.dataSource = this.dataSourceClone.filter((project: Project) =>
        project?.nombre.toLowerCase().includes(this.filterValue)
      );
      this.totalRecords = this.dataSource.length;
    }
  }
}
