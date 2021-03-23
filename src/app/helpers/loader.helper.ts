import { BehaviorSubject } from 'rxjs';

export class LoaderHelper {
  private readonly loaderVisible: BehaviorSubject<boolean>;
  private readonly contentVisible: BehaviorSubject<boolean>;

  constructor() {
    this.loaderVisible = new BehaviorSubject<boolean>(false);
    this.contentVisible = new BehaviorSubject<boolean>(true);
  }

  public getLoaderState(): BehaviorSubject<boolean> {
    return this.loaderVisible;
  }

  public getContentState(): BehaviorSubject<boolean> {
    return this.contentVisible;
  }

  show(): void {
    this.loaderVisible.next(true);
    this.contentVisible.next(false);
  }

  hide(): void {
    this.loaderVisible.next(false);
    this.contentVisible.next(true);
  }

}
