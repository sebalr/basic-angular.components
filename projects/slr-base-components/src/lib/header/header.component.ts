/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, Input, OnDestroy } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { BaseComponentsService } from '../base-components.service';
import { SidebarMobileService } from '../sidebar-mobile/sidebar-mobile.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'slr-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {

  @Input() public dropdownActive = false;
  @Input() public backNavigationActive = false;
  @Input() public backNavigationSmActive = false;
  @Input() public colapsableSidebar = false;
  @Input() public mobileSidebar = false;
  @Input() public homeRoute = 'home';

  public inHome = false;

  public get showDropdown(): boolean {
    return this.dropdownActive && this.getName() != null && this.inHome;
  }

  public get showBack(): boolean {
    return this.backNavigationActive && !this.inHome;
  }
  public get showBackSm(): boolean {
    return this.backNavigationSmActive && !this.inHome;
  }

  private subs = new Subscription();

  constructor(
    private router: Router,
    public coreService: BaseComponentsService,
    private sidebarService: SidebarService,
    private sidebarMobileService: SidebarMobileService) {

    this.subs.add(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ).subscribe((event: any) => {
      this.inHome = event.url?.endsWith(this.homeRoute) ?? false;
    }));
  }

  public toggleSidebar(): void {
    this.sidebarService.toggleSidebar.next();
  }

  public back(): void {
    this.coreService.back();
  }

  public getName(): string {
    return this.coreService.getName();
  }

  public toggleMobileSidebar(): void {
    this.sidebarMobileService.toggleSidebar.next();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
