import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarMobileComponent } from './sidebar-mobile/sidebar-mobile.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NgbDropdownModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SidebarMobileComponent,
    LoaderComponent,
    TypeaheadComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    FormsModule,
    NgbTypeaheadModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    SidebarMobileComponent,
    FooterComponent,
    LoaderComponent,
    TypeaheadComponent
  ]
})
export class BaseComponentsModule { }
