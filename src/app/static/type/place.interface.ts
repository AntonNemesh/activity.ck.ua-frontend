import { IPhotos } from './photos.interface';
import { IOrganization } from './organization.interface';
import { IWorkTime, IWorkTimeForm } from './week.interface';

export interface IPlaceBase {
  id: number;
  organization?: IOrganization;
  category_id: string;
  type_id: string;
  photos: IPhotos[];
  main_photo: string;
  name: string;
  phones: string[];
  address: string;
  website: string;
  accessibility: boolean;
  dog_friendly: boolean;
  child_friendly: boolean;
  favorite: boolean;
  visited: boolean;
  description: string;
  rating?: number;
}

export interface IPlace extends IPlaceBase {
  organization_id?: number;
  work_time: IWorkTime;
}

export interface IPlacesResponse {
  _total: number;
  _totalPages: number;
  places: IPlace[];
}

export interface IPlaceResponse {
  place: IPlace;
}

export interface IPlaceForm {
  photos_group: IPhotosGroup;
  work_time_group: IWorkTimeForm;
  organization_group: IOrganizationGroup;
  availability_group: IAvailabilityGroup;
  main_group: IMainGroup;
  category_group: ICategoryGroup;
}

export interface IPhotosGroup {
  main_photo: string;
  photos: string;
}

export interface IOrganizationGroup {
  organization_id: string;
  organization?: IOrganization;
}

export interface IAvailabilityGroup {
  accessibility: boolean;
  child_friendly: boolean;
  dog_friendly: boolean;
}

export interface IMainGroup {
  name: string;
  description: string;
  address: string;
  website: string;
  phones: string[];
}

export interface ICategoryGroup {
  category_id: string;
  type_id?: string;
}

export interface IPlaceReviewsResponse {
  reviews: IPlaceReview[];
  _total: number;
  _totalPages: number;
}

export interface IPlaceReview {
  user_name?: string;
  user_avatar?: string;
  comment: null|string;
  rating: number;
  created_at?: string;
}

