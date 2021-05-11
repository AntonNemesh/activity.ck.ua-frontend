import {
  IEventRequestParams,
  IEventsRequestParamsHelper,
  IAvailabilityFilterState
} from '../static/type';

export class EventsRequestParamsHelper {
  public startTime: number;
  private readonly page: number;
  private readonly limit: number;
  public filterAvailabilityState: Partial<IAvailabilityFilterState> = {};

  constructor(startTime: number, page: number = 1, limit: number = 4, filterAvailabilityState?: string[]) {
    this.startTime = startTime;
    this.page = page;
    this.limit = limit;
    if (filterAvailabilityState) {
      this.setFilterAvailabilityState(filterAvailabilityState);
    }
  }

  private setFilterAvailabilityState(filterAvailabilityState: string[]): void {
    if (!filterAvailabilityState?.length) { return; }
    filterAvailabilityState.forEach((item) => {
      this.filterAvailabilityState[item] = true;
    });
  }

  public toJSON(): Partial<IEventRequestParams> {
    const params: Partial<IEventRequestParams> = {
      start_time: this.startTime,
      _page: this.page,
      _limit: this.limit
    };

    if (Object.keys(this.filterAvailabilityState)?.length) {
      for (const key in this.filterAvailabilityState) {
        if (!this.filterAvailabilityState.hasOwnProperty(key)){ continue; }
        params[key] = this.filterAvailabilityState[key];
      }
    }
    return params;
  }
}
