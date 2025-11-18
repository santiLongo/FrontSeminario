import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { BaseReadGrid } from './utils/base-read-grid';

@Component({
  selector: 'app-basic-grid',
  templateUrl: './basic-grid.component.html',
  styleUrls: ['./basic-grid.component.css'],
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatMenuModule, MatIconModule],
})
export class BasicGridComponent<T>
  extends BaseReadGrid<T>
  implements AfterViewInit, OnInit
{
  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

export interface BasicGridConfig {
  columns: GridColumnConfig[];
  actions?: GridAction[];
  tooglebar?: GridAction[];
}

export interface GridColumnConfig {
  columnName: string;
  label: string;
  type: 'number' | 'text' | 'date';
  format?: 'decimal' | 'date-time';
}

export interface GridAction {
  name: string;
  icon: string;
  event: {};
}

