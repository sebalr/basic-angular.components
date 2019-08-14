import { Component, OnInit, Input } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { BaseComponentsService } from '../base-components.service';
import { SidebarMobileService } from '../sidebar-mobile/sidebar-mobile.service';

@Component({
  selector: 'slr-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input() public dropdownActive = false;
  @Input() public colapsableSidebar = false;

  constructor(public coreService: BaseComponentsService, private sidebarService: SidebarService,
    private sidebarMobileService: SidebarMobileService) { }

  ngOnInit() {
  }

  public toggleSidebar() {
    this.sidebarService.toggleSidebar.next();
  }

  public back(): void {
    this.coreService.back();
  }

  public getName(): string {
    return this.coreService.getName();
  }

  public toggleMobileSidebar() {
    this.sidebarMobileService.toggleSidebar.next();
  }
}
