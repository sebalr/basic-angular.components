import { NgModule } from '@angular/core';
import { BaseComponentsComponent } from './base-components.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarMobileComponent } from './sidebar-mobile/sidebar-mobile.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [BaseComponentsComponent, HeaderComponent, SidebarComponent, FooterComponent, SidebarMobileComponent],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [BaseComponentsComponent, HeaderComponent, SidebarComponent, SidebarMobileComponent, FooterComponent]
})
export class BaseComponentsModule { }
