import { IPhotos } from './photos.interface';
import { IAvailabilityGroup, IMainGroup, IPhotosGroup } from './place.interface';

export interface IEventsResponse {
  events: IEvent[];
  _total: number;
  _totalPages: number;
}

export interface IEventResponse {
  event: IEvent;
  photos: IPhotos[];
}

export interface IEventForm {
  photos_group: IPhotosGroup;
  schedule_group: IScheduleGroup;
  availability_group: IAvailabilityGroup;
  main_group: IEventMainGroup;
}

export interface IEventMainGroup extends IMainGroup{
  program: string;
  price: string;
  organizer: string;
  place_id: number;
}

export interface IScheduleGroup {
  start_time: Date;
  end_time: Date;
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
