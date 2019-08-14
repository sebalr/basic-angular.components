import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarMobileService } from './sidebar-mobile.service';
import { Subscription } from 'rxjs';
import { trigger, transition, animate, keyframes } from '@angular/animations';
import { fadeInLight, fadeOutLight, slideInLeft, slideOutLeft } from '../shared/animations/keyframe';

@Component({
  selector: 'slr-sidebar-mobile',
  templateUrl: './sidebar-mobile.component.html',
  animations: [
    trigger('sidebarTrigger', [
      transition(':enter', animate(500, keyframes(slideInLeft))),
      transition(':leave', animate(500, keyframes(slideOutLeft)))
    ]),
    trigger('backdropTrigger', [
      transition(':enter', animate(500, keyframes(fadeInLight))),
      transition(':leave', animate(500, keyframes(fadeOutLight)))
    ]),
  ]
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

  public toggleSidebar(): void {
    this.sidebarService.toggleSidebar.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
