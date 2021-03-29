import { IPhotos } from './photos.interface';

export interface IEvent {
  id: number;
  name: string;
  address: string;
  phones: string[];
  website: string;
  main_photo: string;
  description: string;
  accessibility: boolean;
  dog_friendly: boolean;
  child_friendly: boolean;
  program: string;
  passing_time: string;
  photos: IPhotos[];
  organization_id: number;
  user_id: number;
  place_id: number;
  price: string;
}
