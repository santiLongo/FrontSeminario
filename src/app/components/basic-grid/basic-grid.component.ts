import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BaseReadGrid } from './utils/base-read-grid';

@Component({
  selector: 'app-basic-grid',
  templateUrl: './basic-grid.component.html',
  imports: [MatTableModule, MatPaginatorModule],
})
export class BasicGridComponent<T> extends BaseReadGrid<T> implements AfterViewInit, OnInit {
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}

export interface BasicGridConfig{
    columnName: string;
    label: string;
    type: 'number' | 'text' | 'date';
    format?: 'decimal' | 'date-time';
}