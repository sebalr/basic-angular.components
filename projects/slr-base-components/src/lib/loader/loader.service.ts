import { Injectable } from '@angular/core';
import { Subject, Subscription, timer, BehaviorSubject } from 'rxjs';
import { LoaderState } from './loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public DELAY_TIME = 500;

  private loaderSubject = new BehaviorSubject<LoaderState>({ showLoading: false });
  public loaderState = this.loaderSubject.asObservable();


  constructor() { }

  public show(): Subscription {
    const timerObs = timer(this.DELAY_TIME);
    return timerObs.subscribe(t => this.loaderSubject.next({ showLoading: true }));
  }

  public hide(sub: Subscription) {
    sub.unsubscribe();
    this.loaderSubject.next({ showLoading: false });
  }
}
