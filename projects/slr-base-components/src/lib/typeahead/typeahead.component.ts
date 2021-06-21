import { EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, Input } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { ITypeaheadModel, ITypeaheadProvider } from '../shared/providers/providers.interfaces';
import { Observable, of, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'slr-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent<T> {

  @Output() selected = new EventEmitter<ITypeaheadModel>();

  @Input() provider: ITypeaheadProvider<T>;
  @Input() label = '';
  @Input() inputId = '';
  @Input() placeholder = '';
  @Input() debounce = 200;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  readonly formatter = (x: ITypeaheadModel): string => x.label;

  model: T;
  searching = false;

  search: OperatorFunction<string, readonly ITypeaheadModel[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(this.debounce),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => this.provider ? this.provider.filter(term) : of([])),
      tap(() => this.searching = false)
    );

  selectedItem($event: NgbTypeaheadSelectItemEvent): void {
    this.selected.emit($event.item);
  }

  modelChange($event: ITypeaheadModel | string): void {
    if (typeof $event === 'string' && $event?.length === 0) {
      this.selected.emit(null);
    }
  }
}
