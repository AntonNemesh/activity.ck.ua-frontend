import { IPhotos } from './photos.interface';

export interface IPlace {
  id: number;
  category_id: number;
  type_id: string;
  photos: IPhotos[];
  name: string;
  phone: string;
  address: string;
  website: string;
  work_time: string;
  accessibility: boolean;
  dog_friendly: boolean;
  child_friendly: boolean;
  description: string;
  rating: number;
}
