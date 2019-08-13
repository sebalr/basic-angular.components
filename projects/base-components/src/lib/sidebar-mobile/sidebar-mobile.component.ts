import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarMobileService } from './sidebar-mobile.service';
import { Subscription } from 'rxjs';
import { BaseComponentsService } from '../base-components.service';

@Component({
  selector: 'slr-sidebar-mobile',
  templateUrl: './sidebar-mobile.component.html'
})
export class SidebarMobileComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  public open = false;

  constructor(private sidebarService: SidebarMobileService) { }

  ngOnInit() {
    this.subs.add(this.sidebarService.toggleSidebar.subscribe(() => {
      this.open = !this.open;
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
