import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderVisible: Subject<boolean> = new Subject<boolean>();
  contentVisible: Subject<boolean> = new Subject<boolean>();

  show(): void {
    this.loaderVisible.next(true);
    this.contentVisible.next(false);
  }

  hide(): void {
    this.loaderVisible.next(false);
    this.contentVisible.next(true);
  }
}
