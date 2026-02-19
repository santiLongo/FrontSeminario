import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHttpService } from 'lib-core';
import { Observable } from 'rxjs';
import { ComboType } from '../models/combo-type';
import { CoreLibService } from '../../../config/core.service';

@Injectable({
  providedIn: 'root',
})
export class ComboHttpService {
  private url = '';

  constructor(
    private http: ApiHttpService,
    private config: CoreLibService,
  ) {
    this.url = config.loginUrl + 'v1/combo/';
  }

  getCombo(type: string, extraParams?: any): Observable<ComboType[]> {
    const fullUrl = this.url + 'get';

    const params = {
      type,
      ...(extraParams ?? {}),
    };
    return this.http.get<ComboType[]>(fullUrl, params);
  }
}
