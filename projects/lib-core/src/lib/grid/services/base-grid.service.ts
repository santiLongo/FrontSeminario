import { GridState, PagedResult } from 'lib-core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

export abstract class BaseGridService<T> {
  private dataSub$ = new BehaviorSubject<T[]>([]);
  private totalSub$ = new BehaviorSubject<number>(0);
  private loadingSub$ = new BehaviorSubject<boolean>(false);

  data$ = this.dataSub$.asObservable();
  total$ = this.totalSub$.asObservable();
  loading$ = this.loadingSub$.asObservable();

  page = 1;
  pageSize = 10;

  protected setLoading(value: boolean) {
    this.loadingSub$.next(value);
  }

  protected setData(data: T[], total: number) {
    this.dataSub$.next(data);
    this.totalSub$.next(total);
  }

  public search(page: number = this.page): void {
    this.page = page;
    this.setLoading(true);
    //
    const state: GridState = {
      page: this.page,
      pageSize: this.pageSize
    };
    //
    this.getData(state)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe((res) => {
        this.setData(res.items, res.total);
      });
  }

  abstract getData(state: GridState): Observable<PagedResult<T>>;
}
