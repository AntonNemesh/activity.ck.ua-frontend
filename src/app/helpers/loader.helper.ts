import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export class LoaderHelper {
  private readonly loaderState: BehaviorSubject<boolean>;

  constructor() {
    this.loaderState = new BehaviorSubject<boolean>(false);
  }

  public show(): void {
    this.loaderState.next(true);
  }

  public hide(): void {
    this.loaderState.next(false);
  }

  public get isVisibleLoader$(): Observable<boolean> {
    return this.loaderState.asObservable().pipe(
      distinctUntilChanged()
    );
  }

  public get isVisibleContent$(): Observable<boolean> {
    return this.loaderState.asObservable().pipe(
      map(state => !state),
      distinctUntilChanged()
    );
  }

}
