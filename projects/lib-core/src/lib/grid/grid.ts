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
  SelectebleSettings,
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
  selectableSettings?: SelectebleSettings<T>;
  checked = false;
  indeterminate = false;
  loading = false;
  total = 10;
  
  selectedRows: T[] = [];
  private selectedSet = new Set<T>();

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.columns = this.config.columns;
    this.menuActions = this.config.menuActions ?? [];
    this.toolbarButtons = this.config.toolBarActions ?? [];
    this.selectableSettings = this.config.selectableSettings;

    this.dataService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.data = data;
        this.refreshSelectionStatus();
      });

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

  onPageSizeChange(size: number) {
    this.dataService.pageSize = size;
    this.dataService.search(1);
  }

  //Metodos para seleccionar

  isChecked(row: T): boolean {
    return this.selectedSet.has(row);
  }

  onRowChecked(row: T, checked: boolean) {
    if (!this.selectableSettings?.selectable) return;

    if (this.selectableSettings.type === 'single') {
      if (checked) {
        this.selectedSet.clear();
        this.selectedSet.add(row);
      } else {
        this.selectedSet.delete(row);
      }
    } else {
      checked ? this.selectedSet.add(row) : this.selectedSet.delete(row);
    }

    this.refreshSelectionStatus();
  }

  onAllChecked(checked: boolean) {
    if (!this.selectableSettings?.selectable) return;

    const selectableRows = this.data.filter(r => this.isRowSelectable(r));

    if (this.selectableSettings.type === 'single') {
      this.selectedSet.clear();
    } else {
      selectableRows.forEach(row => {
        checked ? this.selectedSet.add(row) : this.selectedSet.delete(row);
      });
    }

    this.refreshSelectionStatus();
  }

  private refreshSelectionStatus() {
    const pageData = this.data;

    const selectedOnPage = pageData.filter(r => this.selectedSet.has(r)).length;

    this.checked = selectedOnPage > 0 && selectedOnPage === pageData.length;
    this.indeterminate =
      selectedOnPage > 0 && selectedOnPage < pageData.length;

    this.selectedRows = Array.from(this.selectedSet);
  }

  public isRowSelectable(row: T): boolean {
    if (!this.selectableSettings?.selectable) return false;
    if (!this.selectableSettings.esSelectable) return true;
    return this.selectableSettings.esSelectable(row);
  }
}
