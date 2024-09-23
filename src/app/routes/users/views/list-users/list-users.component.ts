import { Component } from '@angular/core';
import {
  BaseHeaderComponent,
  ExportOptions,
  Messages,
  Modal,
} from '@shared/classes/base_component';
import { MetaData } from '@shared/models/meta-data';
import { UserEntity } from '../../domain/entities/user-entity';
import { UserRepository } from '../../domain/repositories/user-repository';
import { FormUserComponent } from '../form-user/form-user.component';
import { UserApplication } from '../../application/user-application';
import { UtilsService } from '@shared/services/utils.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent extends BaseHeaderComponent<UserEntity, UserRepository> {
  icon_header = 'face';
  title_header = 'titles.users';
  modal: Modal = {
    component: FormUserComponent,
    width: '600px',
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
    { columnDb: 'correo', customTitleColumn: 'CORREO' },
  ];
  // Está metadata es para exportar solamente las columnas necesarias
  metaDataExport: MetaData[] = [
    { columnDb: 'id', customTitleColumn: 'ID' },
    { columnDb: 'nombre', customTitleColumn: 'NOMBRE' },
    { columnDb: 'correo', customTitleColumn: 'CORREO' },
  ];
  exportOptions: ExportOptions = {
    fileName: 'users',
    sheetName: 'users',
  };

  constructor(
    protected readonly userApplication: UserApplication,
    protected readonly utilsSvc: UtilsService,
    protected toast: ToastrService,
    protected translate: TranslateService
  ) {
    super(userApplication, utilsSvc, toast, translate);
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
      this.dataSource = this.dataSourceClone.filter((user: UserEntity) =>
        user?.nombre.toLowerCase().includes(this.filterValue)
      );
      this.totalRecords = this.dataSource.length;
    }
  }
}
