import { IPhotos } from './photos.interface';
import { IProposeOrganization } from './organization.interface';
import { IWorkTime, IWorkTimeForm } from './week.interface';

export interface IPlaceBase {
  id: number;
  organization?: IProposeOrganization;
  category_id: string;
  type_id: string;
  photos: string[];
  main_photo: string;
  name: string;
  phones: string[];
  address: string;
  website: string;
  accessibility: boolean;
  dog_friendly: boolean;
  child_friendly: boolean;
  description: string;
  rating?: number;
}

export interface IPlace extends IPlaceBase {
  organization_id?: number;
  work_time: IWorkTime;
}

export interface IPlaceForm {
  photos_group: IPhotosGroup;
  work_time_group: IWorkTimeForm;
  organization_group: IOrganizationGroup;
  tolerance_group: IToleranceGroup;
  main_group: IMainGroup;
  category_group: ICategoryGroup;
}

export interface IPhotosGroup {
  main_photo: string;
  photos: string;
}

export interface IOrganizationGroup {
  organization_id: string;
  organization?: IProposeOrganization;
}

export interface IToleranceGroup {
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

