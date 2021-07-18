import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseModel, IBaseDto, ITypeaheadModel, ITypeaheadProvider } from './providers.interfaces';
import { BaseProvider } from './base-provider';

export class TypeaheadProvider<T extends IBaseDto, U extends BaseModel> extends BaseProvider<T, U> implements ITypeaheadProvider<T> {

  constructor(protected url: string, protected httpClient: HttpClient) {
    super(url, httpClient)
  }

  public filter(term: string): Observable<ITypeaheadModel<T>[]> {
    return this.httpClient.get<{ data: T[] }>(`${this.url}?contains=${term}`).pipe(
      map(res => {
        return res.data.map(this.mapTypeaheadItem);
      }));
  }

  mapTypeaheadItem: (item: T) => ITypeaheadModel<T>;
}
