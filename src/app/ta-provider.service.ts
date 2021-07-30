/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@angular/core';
import { ITypeaheadModel, ITypeaheadProvider } from 'projects/slr-base-components/src/public-api';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaProviderService implements ITypeaheadProvider<any, any> {

  filter = (term: string) =>
    of([{ label: "one", item: { a: 'a' } }, { label: "two", item: { a: 'b' } }, { label: "three", item: { a: 'c' } }].filter(x => x.label.includes(term)).map(x => this.mapTypeaheadItem(x)))


  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  mapTypeaheadItem: (item: any) => ITypeaheadModel<any> = (item: any) => ({ item, label: item.label });


  getTypeahead(): Observable<{ label: string; item: { a: string; }; }[]> {
    return of([{ label: "one", item: { a: 'a' } }, { label: "two", item: { a: 'b' } }, { label: "three", item: { a: 'c' } }]);
  }
}
