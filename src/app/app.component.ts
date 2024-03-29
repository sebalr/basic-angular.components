import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ITypeaheadModel, LoaderService, BaseComponentsService } from 'slr-base-components';
import { ProviderService } from 'src/app/provider.service';
import { TaProviderService } from 'src/app/ta-provider.service';

@Component({
  selector: 'slr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  public subscriptions = new Subscription();
  public isMobile = false;
  public userName = new BehaviorSubject<string>('');

  public selected: ITypeaheadModel<any>;

  constructor(
    private coreService: BaseComponentsService,
    public provider: ProviderService,
    public taprovider: TaProviderService,
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
      this.coreService.setName('asdsad');
    }, 1500);
  }

  public onTypeahead($event) {
    console.log($event);
  }

  public test() {
    console.log(this.selected);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
