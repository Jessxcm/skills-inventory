import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActionPdf } from '@shared/classes/base_component';
import { ConfirmComponent } from '@shared/components/confirm/confirm.component';
import { MetaData } from '@shared/models/meta-data';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { Style } from '@schematics/angular/component/schema';

// Importaciones para exportar a PDF
declare let require: any;
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private readonly dialog = inject(MatDialog);
  private collaborator: any;

  constructor() {}

  // Add - Edit
  openForm<ComponentToOpen extends ComponentType<any>>(
    componentToOpen: ComponentToOpen,
    modal_width: any = '600px',
    data: any = null
  ): Observable<any> {
    const reference: MatDialogRef<any> = this.dialog.open(componentToOpen, {
      width: modal_width,
      disableClose: true,
      data,
    });

    return reference.afterClosed();
  }

  // Delete
  confirm(message: string[] = []): Observable<any> {
    const reference: MatDialogRef<ConfirmComponent> = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      width: '400px',
    });

    if (message.length > 0) reference.componentInstance.messages = message;

    return reference.afterClosed();
  }

  // Collaborator
  setCollaborator(collaborator?: any) {
    this.collaborator = collaborator;
  }

  getCollaborator() {
    return this.collaborator;
  }

  // Export to Excel
  exportDataToExcel<Entity>(
    records: Entity[],
    metaData: MetaData[],
    fileName: string,
    sheetName: string
  ) {
    const result = this.dtoExcel(records, metaData); // Obtengo la data transformada
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]); // Creo una hoja de excel vacia
    XLSX.utils.sheet_add_json(workSheet, result); // Relaciono el json con la hoja de excel existente
    const workBook: XLSX.WorkBook = XLSX.utils.book_new(); // Creo un nuevo libro
    XLSX.utils.book_append_sheet(workBook, workSheet, sheetName); // Al libro de excel le agregó la hoja de excel
    XLSX.writeFile(workBook, `${fileName}.xlsx`);
  }

  private dtoExcel<Entity>(records: Entity[], metaData: MetaData[]) {
    return records.map((item: Entity) => {
      const newElement: any = {};

      for (const key in item) {
        const metaInfo = metaData.find((metaData: MetaData) => metaData.columnDb === key);
        if (metaInfo) {
          newElement[metaInfo.customTitleColumn] = item[key];
        }
      }

      return newElement;
    });
  }

  // Export to PDF
  async exportDataToPdf<Entity>(
    records: Entity[],
    metaData: MetaData[],
    fileName: string,
    title: string,
    action: ActionPdf
  ) {
    const dataUrl = await this.getDataUrl('assets/images/dreamcode.jpeg');

    const dataFormatted = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [20, 20, 20, 20],
      content: [
        this.generateTableHeader(records, dataUrl, title),
        this.generateTableData(records, metaData),
      ],
      styles: this.generateStyles(),

      footer(currentPage: string, pageCount: string) {
        return {
          columns: [
            {
              alignment: 'center',
              text: currentPage + ' de ' + pageCount,
            },
          ],
        };
      },
    };

    this.generatePdf(dataFormatted, fileName, action);
  }

  private generatePdf(dataFormatted: any, fileName: string, action: ActionPdf) {
    const pdf = pdfMake.createPdf(dataFormatted);

    switch (action) {
      case 'view':
        pdf.open();
        break;

      case 'download':
        pdf.download(`${fileName}.pdf`);
        break;

      case 'print':
        pdf.print();
        break;
    }
  }

  private generateTableHeader<Entity>(data: Entity[], dataUrl: any, title: string) {
    return {
      margin: [0, 0, 0, 15],
      table: {
        widths: [120, 'auto', 50, 'auto'],
        body: [
          [
            {
              borderWidth: ['1px', '1px', '1px', '1px'],
              borderColor: ['#000000', '#000000', '#000000', ' #000000'],
              border: [false, false, true, false],
              width: 100,
              image: dataUrl,
            },
            {
              border: [false, false, false, false],
              text: [
                this.generateColumn('Dreamcode', 'headerLeft'),
                this.generateColumn('Melendez - Cali - Colombia', 'subHeaderLeft'),
                this.generateColumn('Tel: 310 5338818', 'subHeaderLeft'),
                this.generateColumn('sks@gmail.com', 'subHeaderLeft'),
                this.generateColumn('www.dreamcodesoft.com', 'subHeaderLeft'),
              ],
            },
            {
              border: [false, false, false, false],
              text: '',
            },
            {
              border: [false, false, false, false],
              text: title,
              style: 'titleReport',
            },
          ],
        ],
      },
    };
  }

  private generateTableData<Entity>(data: Entity[], metaData: MetaData[]) {
    const body = data
      .map((el: any) => {
        const newElement: any = {};

        Object.keys(el).forEach(key => {
          const metaInfo = metaData.find((metaData: MetaData) => metaData.columnDb === key);
          if (metaInfo) {
            newElement[metaInfo.columnDb] = el[key];
          }
        });
        return newElement;
      })
      .map(el => Object.keys(el).map(prop => this.generateRowData(el, metaData, prop)));

    const quantityColumns = metaData.length;
    const widths = Array.from(Array(quantityColumns).keys()).map(
      i => Math.floor(100 / quantityColumns) + '%'
    );
    const rows: any = [];
    metaData.forEach(el => {
      const row = [
        {
          border: [false, false, false, false],
          text: el.customTitleColumn,
          style: 'header',
        },
      ];
      rows.push(row);
    });

    body.unshift(rows);
    return {
      margin: [0, 0, 0, 15],
      table: {
        widths,
        body,
      },
    };
  }

  private generateRowData<Entity>(data: any, metaData: MetaData[], prop: string) {
    const column = metaData.find((metaData: MetaData) => metaData.columnDb === prop);

    if (column) {
      return [
        {
          border: [false, false, false, false],
          text: data[prop],
        },
      ];
    } else {
      return [];
    }
  }

  private generateColumn(text: string, style = '') {
    const column: any = {
      text: text + '\n',
    };

    if (style) {
      column.style = style;
    }
    return column;
  }

  private generateStyles() {
    return {
      headerLeft: {
        fontFamily: 'verdana',
        fontSize: 13,
        height: 16,
        color: '#3c3b40',
      },
      subHeaderLeft: {
        fontFamily: 'verdana',
        fontSize: 10,
        height: 16,
        color: '#3c3b40',
      },
      titleReport: {
        fontFamily: 'verdana',
        fontSize: 15,
        height: 16,
        color: '#3c3b40',
      },
      header: {
        fontFamily: 'verdana',
        fontSize: 13,
        height: 14,
        color: '#3c3b40',
        bold: true,
      },
    };
  }

  private async getDataUrl(pathImage: string) {
    const response = await fetch(pathImage);
    const blob = await response.blob(); // Convierte una imagen a un blob (Binario)
    return new Promise((resolve, reject) => {
      // Convierte el blob a una imagen en base64
      const reader = new FileReader();
      //reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}
