import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'slr-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  constructor(public loaderService: LoaderService) { }

}

export interface LoaderState {
  showLoading: boolean;
}
