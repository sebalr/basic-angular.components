import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseComponentsService {

  public hideReturn$ = new BehaviorSubject<boolean>(true);

  constructor() { }

  public back(): void {
    console.log('back');
  }

  public getName(): string {
    return 'name';
  }
}
