import { IPhotos } from './photos.interface';

export interface IEventsResponse {
  events: IEvent[];
  _total: number;
  _totalPages: number;
}

export interface IEventResponse {
  event: IEvent;
  photos: IPhotos[];
}

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
  start_time: string;
  end_time: string;
  photos: IPhotos[];
  organization_id: number;
  organizer: string;
  user_id: number;
  place_id: number;
  price: string;
}
