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
  scheduled: boolean;
  organization_id: number;
  organizer: string;
  user_id: number;
  place_id: number;
  price: string;
}

export interface IEventForm {
  name: string;
  organizer: string;
  price: number;
  website: string;
  address: string;
  phone: number;
  date: number;
  start: number;
  end: number;
  program: string;
  details: string;
  accessibility: boolean;
  child_friendly: boolean;
  dog_friendly: boolean;
}
