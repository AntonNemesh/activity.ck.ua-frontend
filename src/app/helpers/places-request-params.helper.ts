import { IPlaceRequestParams, IPlacesRequestParamsHelper, IAvailabilityFilterState } from '../static/type';

export class PlacesRequestParamsHelper {
  private readonly page: number;
  private readonly limit: number;
  private readonly categoryId: string;
  private typeId: string;
  public filterAvailabilityState: Partial<IAvailabilityFilterState> = {};

  constructor(page: number, limit: number, categoryId: string, filterTypeState: string[], filterAvailabilityState: string[]) {
    this.page = page;
    this.limit = limit;
    this.categoryId = categoryId;
    this.setFilterTypeState(filterTypeState);
    this.setFilterAvailabilityState(filterAvailabilityState);
  }

  private setFilterTypeState(filterTypeState: string[]): void {
    if (!filterTypeState?.length) { return; }
    this.typeId = filterTypeState.join('-');
  }

  private setFilterAvailabilityState(filterAvailabilityState: string[]): void {
    if (!filterAvailabilityState?.length) { return; }
    filterAvailabilityState.forEach((item) => {
      this.filterAvailabilityState[item] = true;
    });
  }

  public toJSON(): Partial<IPlaceRequestParams> {
    const params: Partial<IPlaceRequestParams> = {
      _page: this.page,
      _limit: this.limit
    };

    if (this.typeId?.length) {
      params.type_id = this.typeId;
    } else {
      params.category_id = this.categoryId;
    }

    if (Object.keys(this.filterAvailabilityState)?.length) {
      for (const key in this.filterAvailabilityState) {
        if (!this.filterAvailabilityState.hasOwnProperty(key)){ continue; }
        params[key] = this.filterAvailabilityState[key];
      }
    }
    return params;
  }
}
