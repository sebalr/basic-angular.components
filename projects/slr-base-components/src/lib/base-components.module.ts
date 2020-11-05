import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarMobileComponent } from './sidebar-mobile/sidebar-mobile.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [HeaderComponent, SidebarComponent, FooterComponent, SidebarMobileComponent, LoaderComponent],
  imports: [CommonModule, NgbDropdownModule],
  exports: [HeaderComponent, SidebarComponent, SidebarMobileComponent, FooterComponent, LoaderComponent]
})
export class BaseComponentsModule { }
