import { EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

export interface TypeaheadModel { label: string, item: any };
export interface TypeaheadProvider { filter: (term: string) => Observable<TypeaheadModel[]> };

@Component({
  selector: 'slr-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css']
})
export class TypeaheadComponent implements OnInit {

  @Output() selected = new EventEmitter<TypeaheadModel>();

  @Input() provider: TypeaheadProvider;
  @Input() label = '';
  @Input() inputId = '';
  @Input() placeholder = '';
  @Input() debounce = 200;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  readonly formatter = (x: TypeaheadModel) => x.label;

  model: any;
  searching = false;

  constructor() { }

  ngOnInit(): void {
  }

  search: OperatorFunction<string, readonly TypeaheadModel[]> = (text$: Observable<string>) =>
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

  modelChange($event): void {
    if ($event?.length === 0) {
      this.selected.emit(null);
    }
  }
}
