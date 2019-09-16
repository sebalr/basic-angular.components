import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseComponentsService {

  private name: string;

  public hideReturn$ = new BehaviorSubject<boolean>(true);

  constructor() { }

  public back(): void {
    console.log('back');
  }

  public setName(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}
