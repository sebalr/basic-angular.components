import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription, BehaviorSubject } from 'rxjs';
import { LoaderService } from 'slr-base-components';

@Component({
  selector: 'slr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  public subscriptions = new Subscription();
  public isMobile = false;
  public userName = new BehaviorSubject<string>('');

  constructor(private breakpointObserver: BreakpointObserver, private loaderService: LoaderService) {
    this.subscriptions.add(this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }));
    const sub = this.loaderService.show();
    this.loaderService.show();
    setTimeout(() => {
      console.log('hide');
      this.loaderService.hide(sub);
    }, 3000);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
