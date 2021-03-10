import { IPhotos } from './photos.interface';
import { IProposeOrganization } from './organization.interface';
import { IWorkTime, IWorkTimeForm } from './week.interface';

export interface IPlaceBase {
  id: number;
  organization?: IProposeOrganization;
  category_id: string;
  type_id: string;
  photos: IPhotos[];
  name: string;
  phones: string[];
  address: string;
  website: string;
  accessibility: boolean;
  dog_friendly: boolean;
  child_friendly: boolean;
  description: string;
  rating: number;
}

export interface IPlace extends IPlaceBase{
  organization_id?: number;
  work_time: IWorkTime;
}

export interface IPlaceForm extends IPlaceBase{
  organization_id?: string;
  work_time: IWorkTimeForm;
}
