import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { GridColumn, GridConfig } from './models/model';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { BaseGridService } from './services/base-grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.html',
  imports: [NzTableModule],
})
export class GridComponent<T extends Record<string, any>> implements OnInit, OnDestroy {
  @Input({ required: true }) dataService!: BaseGridService<T>;
  @Input({ required: true }) config!: GridConfig<T>;

  data: T[] = [];
  columns: GridColumn<T>[] = [];
  loading = false;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.columns = this.config.columns;

    this.dataService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.data = data);

    this.dataService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(l => this.loading = l);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
