import {
  IEventRequestParams,
  IEventsRequestParamsHelper,
  IToleranceFilterState
} from '../static/type';

export class EventsRequestParamsHelper {
  public startTime: number;
  private readonly page: number;
  private readonly limit: number;
  public filterToleranceState: Partial<IToleranceFilterState> = {};

  constructor(startTime: number, page: number = 1, limit: number = 6, filterToleranceState?: string[]) {
    this.startTime = startTime;
    this.page = page;
    this.limit = limit;
    if (filterToleranceState) {
      this.setFilterToleranceState(filterToleranceState);
    }
  }

  private setFilterToleranceState(filterToleranceState: string[]): void {
    if (!filterToleranceState?.length) { return; }
    filterToleranceState.forEach((item) => {
      this.filterToleranceState[item] = true;
    });
  }

  public toJSON(): Partial<IEventRequestParams> {
    const params: Partial<IEventRequestParams> = {
      start_time: this.startTime,
      _page: this.page,
      _limit: this.limit
    };

    if (Object.keys(this.filterToleranceState)?.length) {
      for (const key in this.filterToleranceState) {
        if (!this.filterToleranceState.hasOwnProperty(key)){ continue; }
        params[key] = this.filterToleranceState[key];
      }
    }
    return params;
  }
}
