import { EventEmitter, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
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
export class TypeaheadComponent<T> implements OnChanges {

  @Output() selectedChange = new EventEmitter<ITypeaheadModel>();

  @Input() selected: ITypeaheadModel;
  @Input() provider: ITypeaheadProvider<T>;
  @Input() label = '';
  @Input() inputId = '';
  @Input() required = false;
  @Input() editable = false;
  @Input() placeholder = '';
  @Input() debounce = 200;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  readonly formatter = (x: ITypeaheadModel): string => x.label;

  model: ITypeaheadModel;
  searching = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      this.model = changes.selected.currentValue as ITypeaheadModel;
    }
  }

  search: OperatorFunction<string, readonly ITypeaheadModel[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(this.debounce),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => this.provider ? this.provider.filter(term) : of([])),
      tap(() => this.searching = false)
    );

  selectedItem($event: NgbTypeaheadSelectItemEvent): void {
    this.selectedChange.emit($event.item);
  }

  modelChange($event: ITypeaheadModel | string): void {
    if (typeof $event === 'string' && $event?.length === 0) {
      this.selectedChange.emit(null);
    }
  }
}
