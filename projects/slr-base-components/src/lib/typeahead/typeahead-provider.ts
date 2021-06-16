import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ITypeaheadModel, ITypeaheadProvider } from './typeahead.interfaces';

export class TypeaheadProvider<T> implements ITypeaheadProvider<T> {

  private url: string;

  constructor(url: string, private httpClient: HttpClient) {
    this.url = url;
  }

  public filter(term: string): Observable<ITypeaheadModel[]> {
    return this.httpClient.get<{ data: T[] }>(`${this.url}?contains=${term}`).pipe(
      map(res => {
        return res.data.map(this.mapItem);
      }));
  }

  mapItem: (item: T) => ITypeaheadModel;

}
