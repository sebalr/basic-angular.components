import { ElementRef, EventEmitter, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Component, Input } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { ITypeaheadModel, ITypeaheadProvider } from '../shared/providers/providers.interfaces';
import { Observable, of, OperatorFunction, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'slr-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent<T, U> implements OnChanges {

  @Output() selectedChange = new EventEmitter<ITypeaheadModel<U>>();

  @Input() selected: ITypeaheadModel<U> | null;
  @Input() provider: ITypeaheadProvider<T, U>;
  @Input() label = '';
  @Input() small = true;
  @Input() inputId = '';
  @Input() required = false;
  @Input() editable = false;
  @Input() placeholder = '';
  @Input() debounce = 200;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  readonly formatter = (x: ITypeaheadModel<U>): string => x.label;

  model: ITypeaheadModel<U>;
  searching = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      this.model = changes.selected.currentValue as ITypeaheadModel<U>;
    }
  }

  public focus(): void {
    this.input.nativeElement.focus()
  }

  search: OperatorFunction<string, readonly ITypeaheadModel<U>[]> = (text$: Observable<string>) =>
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
}
