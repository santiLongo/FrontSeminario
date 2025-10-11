import { BehaviorSubject, Observable } from 'rxjs';

export abstract class BaseReadService<T> implements IBaseReadService<T> {
  public dataSub$ = new BehaviorSubject<T[]>([]);

  abstract getAll(): Observable<Array<T>>;

  search(): void {
    this.getAll().subscribe((data) => {
      this.dataSub$.next(data);
    });
  }
}

interface IBaseReadService<T> {
  getAll(): Observable<Array<T>>;

  search(): void;
}