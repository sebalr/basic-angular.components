import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITypeaheadBaseProvider } from 'slr-base-components';

@Injectable({
  providedIn: 'root'
})
export class ProviderService implements ITypeaheadBaseProvider {


  getTypeahead(): Observable<{ label: string; item: { a: string; }; }[]> {
    return of([{ label: "one", item: { a: 'a' } }, { label: "two", item: { a: 'b' } }, { label: "three", item: { a: 'c' } }]);
  }
}
