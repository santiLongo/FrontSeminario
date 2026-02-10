import { BehaviorSubject, Observable } from 'rxjs';

export abstract class BaseGridService<T> {
  private dataSub$ = new BehaviorSubject<T[]>([]);
  private loadingSub$ = new BehaviorSubject<boolean>(false);

  data$ = this.dataSub$.asObservable();
  loading$ = this.loadingSub$.asObservable();

  protected setLoading(value: boolean) {
    this.loadingSub$.next(value);
  }

  protected setData(data: T[]) {
    this.dataSub$.next(data);
  }

  public search(): void {
    this.setLoading(true);
    this.getData(true).subscribe({
      next: (data) => {
        this.setData(data);
      },
      error: () => {
        console.error('Error fetching data:');
      },
      complete: () => {
        this.setLoading(false);
      },
    });
  }

  abstract getData(loading: boolean): Observable<T[]>;
}
