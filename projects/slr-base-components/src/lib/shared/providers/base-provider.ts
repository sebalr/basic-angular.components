import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IBaseDto, BaseModel, IBaseProvider } from './providers.interfaces';

export class BaseProvider<T extends IBaseDto, U extends BaseModel> implements IBaseProvider<T, U> {

  constructor(protected url: string, protected httpClient: HttpClient) {
  }

  public get(): Observable<U[]> {
    return this.httpClient.get<{ data: T[] }>(this.url).pipe(
      map(res => {
        return res.data.map(x => this.mapItem(x));
      }));
  }

  public getOne(id: number): Observable<U> {
    return this.httpClient.get<{ data: T }>(`${this.url}/${id}`).pipe(
      map(res => { return this.mapItem(res.data); })
    );
  }

  public add(item: T): Observable<U> {
    return this.httpClient.post<{ data: T }>(this.url, item).pipe(
      map(res => { return this.mapItem(res.data); })
    );
  }

  public edit(id: number, item: T): Observable<U> {
    return this.httpClient.put<{ data: T }>(`${this.url}/${id}`, item).pipe(
      map(res => { return this.mapItem(res.data); })
    );
  }

  public delete(id: number): Observable<U> {
    return this.httpClient.delete<{ data: T }>(`${this.url}/${id}`).pipe(
      map(res => { return this.mapItem(res.data); })
    );
  }

  mapItem(item: T): U {
    const model = new BaseModel();
    model.prepareFromJson(item);
    return model as U;
  }

}
