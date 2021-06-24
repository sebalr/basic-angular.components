import { EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Component, Input } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { ITypeaheadBaseProvider, ITypeaheadModel } from '../shared/providers/providers.interfaces';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'slr-basic-typeahead',
  templateUrl: './basic-typeahead.component.html',
  styleUrls: ['./basic-typeahead.component.scss']
})
export class BasicTypeaheadComponent implements OnInit, OnChanges {

  @Output() selectedChange = new EventEmitter<ITypeaheadModel>();

  @Input() selected: ITypeaheadModel;
  @Input() provider: ITypeaheadBaseProvider;
  @Input() label = '';
  @Input() inputId = '';
  @Input() required = false;
  @Input() withClear = false;
  @Input() editable = false;
  @Input() placeholder = '';
  @Input() debounce = 200;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  private data: ITypeaheadModel[] = [];

  public focus$ = new Subject<string>();
  public click$ = new Subject<string>();

  readonly formatter = (x: ITypeaheadModel): string => x.label;

  model: ITypeaheadModel;

  ngOnInit(): void {
    this.provider.getTypeahead().subscribe(res => this.data = res);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      this.model = changes.selected.currentValue as ITypeaheadModel;
    }
  }

  search: OperatorFunction<string, readonly ITypeaheadModel[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (
        term === ''
          ? this.data
          : this.data.filter(v => v.label.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)
      ));
  }

  selectedItem($event: NgbTypeaheadSelectItemEvent): void {
    this.selectedChange.emit($event.item);
  }

  modelChange($event: ITypeaheadModel | string): void {
    if (typeof $event === 'string' && $event?.length === 0) {
      this.selectedChange.emit({ label: '', item: null });
    }
  }

  clear(): void {
    this.model = null;
    this.selectedChange.emit({ label: '', item: null });
  }
}
