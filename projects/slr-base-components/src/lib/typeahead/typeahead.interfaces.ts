import { Observable } from 'rxjs';

export interface ITypeaheadModel { label: string, item: any }
export interface ITypeaheadProvider<T> {
  filter: (term: string) => Observable<ITypeaheadModel[]>;
  mapItem: (item: T) => ITypeaheadModel;
}
