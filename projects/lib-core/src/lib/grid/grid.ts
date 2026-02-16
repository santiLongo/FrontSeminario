import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  GridColumn,
  GridConfig,
  GridMenuAction,
  GridToolBarAction,
} from './models/model';
import { Subject, takeUntil } from 'rxjs';
import { BaseGridService } from './services/base-grid.service';
import { DynamicFormatPipe } from './pipes/dynamic-format.pipe';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  standalone: true,
  selector: 'app-grid',
  templateUrl: './grid.html',
  imports: [
    NzTableModule,
    DynamicFormatPipe,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzMenuModule,
    MatIconModule,
    ButtonComponent,
    MatMenuModule,
  ],
})
export class GridComponent<T extends Record<string, any>>
  implements OnInit, OnDestroy
{
  @Input({ required: true }) dataService!: BaseGridService<T>;
  @Input({ required: true }) config!: GridConfig<T>;

  data: T[] = [];
  columns: GridColumn<T>[] = [];
  menuActions: GridMenuAction<T>[] = [];
  toolbarButtons: GridToolBarAction<T>[] = [];
  loading = false;
  selectedRows: T[] = [];
  total = 10;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.columns = this.config.columns;
    this.menuActions = this.config.menuActions ?? [];
    this.toolbarButtons = this.config.toolBarActions ?? [];

    this.dataService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.data = data));

    this.dataService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((l) => (this.loading = l));

    this.dataService.total$
      .pipe(takeUntil(this.destroy$))
      .subscribe((t) => (this.total = t));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRowSelect(row: T, checked: boolean) {
    if (checked) {
      this.selectedRows.push(row);
    } else {
      this.selectedRows = this.selectedRows.filter((r) => r !== row);
    }
  }

  onPageSizeChange(size: number) {
    this.dataService.pageSize = size;
    this.dataService.search(1);
  }
}
