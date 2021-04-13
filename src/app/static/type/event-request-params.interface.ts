export interface IEventRequestParams {
  start_time: number;
  _page: number;
  _limit: number;
  accessibility: boolean;
  child_friendly: boolean;
  dog_friendly: boolean;
}

export interface IEventsRequestParamsHelper {
  startTime: number;
  page: number;
  limit: number;
  filterAvailabilityState: string[];
}
