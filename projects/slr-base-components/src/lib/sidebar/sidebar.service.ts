import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public toggleSidebar: Subject<any> = new Subject();

  constructor() { }
}
