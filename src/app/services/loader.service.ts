import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  contentVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  show(): void {
    this.loaderVisible.next(true);
    this.contentVisible.next(false);
  }

  hide(): void {
    this.loaderVisible.next(false);
    this.contentVisible.next(true);
  }

}
