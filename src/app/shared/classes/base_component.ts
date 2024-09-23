import { PageEvent } from '@angular/material/paginator';
import { BaseApplication } from '@core/application/base-application';
import { BaseMethods, ResultPage } from '@core/domain/base-methods-interface';
import { TranslateService } from '@ngx-translate/core';
import { MetaData } from '@shared/models/meta-data';
import { UtilsService } from '@shared/services/utils.service';
import { ToastrService } from 'ngx-toastr';

export type ActionPdf = 'view' | 'download' | 'print';

export type ExportOptions = {
  fileName: string;
  sheetName: string;
};

export type Messages = {
  confirm: string;
  insert: string;
  update: string;
  delete: string;
};

export type Modal = {
  component: any;
  width: string;
};

export abstract class BaseHeaderComponent<Entity, Repository extends BaseMethods<Entity>> {
  abstract icon_header: string;
  abstract title_header: string;
  abstract modal: Modal;
  abstract messages: Messages;
  abstract metaData: MetaData[];
  abstract metaDataExport: MetaData[];
  abstract exportOptions: ExportOptions;

  currentPage = 0;

  filterValue = '';
  totalRecords = 0;
  page_size = 5;
  page_index = 0;
  dataSource: Entity[] = [];
  dataSourceClone: Entity[] = [];
  objectPagination: PageEvent = {
    previousPageIndex: 0,
    pageIndex: this.page_index,
    pageSize: this.page_size,
    length: this.dataSource.length,
  };

  constructor(
    protected application: BaseApplication<Entity, Repository>,
    protected utilsSvc: UtilsService,
    protected toast: ToastrService,
    protected translate: TranslateService
  ) {
    this.changePage(this.objectPagination);
    this.getAll();
  }

  getAll() {
    this.application.list().subscribe({
      next: data => {
        this.dataSourceClone = data;
      },
    });
  }

  changePage(event: PageEvent) {
    this.application.page(event.pageIndex, event.pageSize).subscribe({
      next: (data: ResultPage<Entity>) => {
        this.dataSource = data.records;
        this.totalRecords = data.totalRecords;
        this.currentPage = event.pageIndex;
        this.page_size = event.pageSize;
      },
    });
  }

  openForm(row: Entity = null!) {
    console.log('row', row);

    const reference = this.utilsSvc.openForm(this.modal.component, this.modal.width, row);
    const objectPaginationWithCurrentPage = {
      previousPageIndex: 0,
      pageIndex: this.currentPage,
      pageSize: this.page_size,
      length: this.dataSource.length,
    };

    reference.subscribe(response => {
      if (!response) return;

      console.log('Rx', response);

      const id = response.id;
      //delete response.id;

      if (id) {
        // Update entity
        this.application.update(id, response.data).subscribe({
          next: () => {
            this.changePage(objectPaginationWithCurrentPage);
            this.toast.success(this.translate.instant(this.messages.update));
          },
        });
      } else {
        // New entity
        this.application.insert(response.data).subscribe({
          next: () => {
            this.changePage(objectPaginationWithCurrentPage);
            this.toast.success(this.translate.instant(this.messages.insert));
          },
        });
      }
    });
  }

  delete(id: number, record = '') {
    const confirmMessage = [this.messages.confirm, record];
    const objectPaginationWithCurrentPage = {
      previousPageIndex: 0,
      pageIndex: this.currentPage,
      pageSize: this.page_size,
      length: this.dataSource.length,
    };
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
  }

  exportToExcel() {
    this.application.list().subscribe({
      next: (data: Entity[]) => {
        this.utilsSvc.exportDataToExcel(
          data,
          this.metaDataExport,
          this.exportOptions.fileName,
          this.exportOptions.sheetName
        );
      },
    });
  }

  exportToPdf(action: ActionPdf) {
    this.application.list().subscribe({
      next: (data: Entity[]) => {
        this.utilsSvc.exportDataToPdf(
          data,
          this.metaDataExport,
          this.exportOptions.fileName,
          this.exportOptions.sheetName,
          action
        );
      },
    });
  }
}
