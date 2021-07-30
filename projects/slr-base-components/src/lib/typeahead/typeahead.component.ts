import { ElementRef, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Component, Input } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { ITypeaheadModel, ITypeaheadProvider } from '../shared/providers/providers.interfaces';
import { merge, Observable, of, OperatorFunction, Subject, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'slr-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent<T, U> implements OnInit, OnChanges {

  @Output() selectedChange = new EventEmitter<ITypeaheadModel<U>>();
  @Output() clicked = new EventEmitter<MouseEvent>();
  @Output() focused = new EventEmitter<FocusEvent>();

  @Input() selected: ITypeaheadModel<U> | null;
  @Input() provider: ITypeaheadProvider<T, U>;
  @Input() label = '';
  @Input() small = true;
  @Input() inputId = '';
  @Input() required = false;
  @Input() editable = false;
  @Input() placeholder = '';
  @Input() debounce = 200;
  @Input() searchOnFocus = false;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  readonly formatter = (x: ITypeaheadModel<U>): string => x.label;

  model: ITypeaheadModel<U>;
  searching = false;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly ITypeaheadModel<U>[]>;

  ngOnInit(): void {
    this.setTypeaheadSearch();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      this.model = changes.selected.currentValue as ITypeaheadModel<U>;
    }
    if (changes.searchOnFocus) {
      this.setTypeaheadSearch();
    }
  }

  public onClick($event: MouseEvent): void {
    this.click$.next('');
    this.clicked.emit($event);
  }

  public onFocus($event: FocusEvent): void {
    this.focus$.next('');
    this.focused.emit($event);
  }

  public focus(): void {
    this.input.nativeElement.focus()
  }

  selectedItem($event: NgbTypeaheadSelectItemEvent): void {
    this.selectedChange.emit($event.item);
  }

  modelChange($event: ITypeaheadModel<U> | string): void {
    if (typeof $event === 'string' && $event?.length === 0) {
      this.selectedChange.emit(null);
    }
  }

  blurInput(): void {
    timer(150).subscribe(() => {
      if (typeof this.model === 'string') {
        this.model = undefined;
        this.selectedChange.emit(null);
      }
    });
  }

  private setTypeaheadSearch(): void {
    this.search = (text$: Observable<string>) => {
      const debouncedText$ = text$.pipe(debounceTime(this.debounce), distinctUntilChanged());
      const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
      const inputFocus$ = this.focus$;

      if (this.searchOnFocus) {
        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
          tap(() => this.searching = true),
          switchMap(term => this.provider ? this.provider.filter(term) : of([])),
          tap(() => this.searching = false)
        );
      } else {
        return debouncedText$.pipe(
          tap(() => this.searching = true),
          switchMap(term => this.provider ? this.provider.filter(term) : of([])),
          tap(() => this.searching = false)
        );
      }
    }
  }
}
