import { Directive, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { BaseReadService } from '../services/base-read.service';
import { BasicGridConfig, GridColumnConfig } from '../basic-grid.component';

@Directive()
// Clase abstracta base para cualquier grilla con servicio de lectura
export abstract class BaseReadGrid<T> implements OnInit, OnDestroy {
  @Input() readService!: BaseReadService<T>;
  @Input() config!: BasicGridConfig;

  dataSource = new MatTableDataSource<T>([]);
  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private subs: Subscription = new Subscription();

  ngOnInit(): void {
    this.displayedColumns = this.config.columns.map(c => c.columnName);
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  protected loadData(): void {
    if (!this.readService) return;

     const sub = this.readService.dataSub$.subscribe({
    next: (data) => {
      this.dataSource.data = data;
      if (this.paginator) this.dataSource.paginator = this.paginator;
    },
    error: (err) => console.error('Error al cargar datos del grid:', err)
  });

  this.subs.add(sub);

  // Lanzar una búsqueda inicial si el servicio lo requiere
  this.readService.search();
  }

  formatValue(value: any, column: GridColumnConfig): string {
    if (value == null) return '';

    if (column.type === 'date') {
      const date = new Date(value);
      return column.format === 'date-time'
        ? date.toLocaleString()
        : date.toLocaleDateString();
    }

    if (column.type === 'number' && column.format === 'decimal') {
      return Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 });
    }

    return String(value);
  }

}
