export interface IPlaceRequestParams {
  _page: number;
  _limit: number;
  category_id: string;
  type_id: string;
  accessibility: boolean;
  child_friendly: boolean;
  dog_friendly: boolean;
}

export interface IPlacesRequestParamsHelper {
  page: number;
  limit: number;
  categoryId: string;
  filterTypeState: string[];
  filterAvailabilityState: string[];
}
