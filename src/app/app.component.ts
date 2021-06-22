import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ITypeaheadModel, LoaderService } from 'slr-base-components';
import { ProviderService } from 'src/app/provider.service';

@Component({
  selector: 'slr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  public subscriptions = new Subscription();
  public isMobile = false;
  public userName = new BehaviorSubject<string>('');

  public selected: ITypeaheadModel;

  constructor(
    public provider: ProviderService,
    private breakpointObserver: BreakpointObserver,
    private loaderService: LoaderService) {
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

  public test() {
    console.log(this.selected);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
