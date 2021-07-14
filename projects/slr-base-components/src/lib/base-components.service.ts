import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BaseComponentsService {

  private name: string;

  public hideReturn$ = new BehaviorSubject<boolean>(true);

  constructor(private location: Location) { }

  public back(): void {
    this.location.back();
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}
