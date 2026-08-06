import { Injectable } from '@angular/core';
import { ApiHttpService } from 'lib-servicios';
import { AppConfigService } from './config.service';
import { Observable } from 'rxjs';
import { IComboDataProvider, ComboType } from 'lib-components';

@Injectable({
  providedIn: 'root',
})
export class ComboHttpService implements IComboDataProvider {
  private url = '';

  constructor(
    private http: ApiHttpService,
    private config: AppConfigService,
  ) {
    this.url = config.url + 'v1/combo/';
  }

  getDataCombo(type: string, extraParams?: any): Observable<ComboType[]> {
    const fullUrl = this.url + 'get';

    const params = {
      type,
      ...(extraParams ?? {}),
    };
    return this.http.get<ComboType[]>(fullUrl, params);
  }
}
