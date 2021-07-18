import { Observable } from 'rxjs';

export interface IBaseDto {
  id: number;
}
export class BaseModel {
  private id: number;

  get Id(): number { return this.id; }
  set Id(value: number) { this.id = value; }

  constructor() { this.id = 0; }

  public prepareFromJson(json: IBaseDto): void {
    if (json == null) { return; }
    if (json.id != null) { this.id = json.id; }
  }

}

export interface IBaseProvider<T extends IBaseDto, U extends BaseModel> {
  get: () => Observable<U[]>;
  getOne: (id: number) => Observable<U>;
  edit: (id: number, item: T) => Observable<U>;
  delete: (id: number) => Observable<U>;
  mapItem: (item: T) => U;
}

export interface ITypeaheadModel<T> { label: string, item: T }
export interface ITypeaheadProvider<T> {
  filter: (term: string) => Observable<ITypeaheadModel<T>[]>;
  mapTypeaheadItem: (item: T) => ITypeaheadModel<T>;
}
export interface ITypeaheadBaseProvider<T> {
  getTypeahead: () => Observable<ITypeaheadModel<T>[]>;
}
