import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { SettingsService } from '@core';
import { MetaData } from '../../models/meta-data';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() filterValue = '';
  @Input() metaData!: MetaData[];
  @Input() dataSource: any = [];

  // TODO: Lineas para agregar una nueva columna: (actions)
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ContentChildren(MatColumnDef, { descendants: true }) columnDefs!: QueryList<MatColumnDef>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [];
  options = this.settings.getOptions();

  constructor(private settings: SettingsService) {}

  ngOnInit(): void {
    this.displayedColumns = this.metaData.map(item => item.columnDb);
  }

  ngAfterViewInit() {
    console.log('this.options', this.options);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // TODO: Método/Estado que usaré para detectar cuando agrego una nueva columna en el componente
  ngAfterContentInit() {
    if (!this.columnDefs) return;

    this.columnDefs.forEach(columnDef => {
      this.displayedColumns.push(columnDef.name);
      this.table.addColumnDef(columnDef);
    });
  }

  select(row: any): void {
    //console.log(row);
  }
}
