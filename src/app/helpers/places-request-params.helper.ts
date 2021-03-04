import { IPlaceRequestParams, IPlacesRequestParamsHelper, IToleranceFilterState } from '../static/type';

export class PlacesRequestParamsHelper {
  private readonly page: number;
  private readonly limit: number;
  private readonly categoryId: number;
  private typeId: string;
  public filterToleranceState: Partial<IToleranceFilterState> = {};

  constructor({page, limit, categoryId, filterTypeState, filterToleranceState}: IPlacesRequestParamsHelper) {
    this.page = page;
    this.limit = limit;
    this.categoryId = categoryId;
    this.setFilterTypeState(filterTypeState);
    this.setFilterToleranceState(filterToleranceState);
  }

  private setFilterTypeState(filterTypeState: string[]): void {
    if (!filterTypeState?.length) { return; }
    this.typeId = filterTypeState[0];
  }

  private setFilterToleranceState(filterToleranceState: string[]): void {
    if (!filterToleranceState?.length) { return; }
    filterToleranceState.forEach((item) => {
      this.filterToleranceState[item] = true;
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

    if (Object.keys(this.filterToleranceState)?.length) {
      for (const key in this.filterToleranceState) {
        if (!this.filterToleranceState.hasOwnProperty(key)){ continue; }
        params[key] = this.filterToleranceState[key];
      }
    }
    return params;
  }
}
