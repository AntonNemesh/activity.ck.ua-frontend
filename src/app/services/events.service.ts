import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IEvent, IEventForm,
  IEventRequestParams,
  IEventResponse,
  IEventsResponse, IPhotos, IScheduleGroup
} from '../static/type';
import { ApiUrlService } from './api-url.service';
import {EventsRequestParamsHelper} from '../helpers';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  public buildPhotos(urls: string[]): IPhotos[] {
    const result: IPhotos[] = [];
    urls.forEach((url) => { result.push({url}); });
    return result;
  }

  public buildPhones(phones: string[]): string[] {
    const result: string[] = [];
    phones.forEach((phone) => {
      result.push(phone.replace(/[^0-9+]/g, ''));
    });
    return result;
  }

  public buildSchedule(schedule: any): IScheduleGroup {
    const date: Date = new Date(schedule.date);
    return {
      start_time: new Date(date.setHours(schedule.start_time.split(':')[0], schedule.start_time.split(':')[1])),
      end_time: new Date(date.setHours(schedule.end_time.split(':')[0], schedule.end_time.split(':')[1])),
    };
  }

  public buildRequest(dataForm: IEventForm, linksToPhotos: string[]): IEventResponse {
    const result: any = {};
    const event: any = {};
    let photos: IPhotos[] = [];

    if (dataForm.hasOwnProperty('main_group')) {
      event.name = dataForm.main_group.name;
      event.description = dataForm.main_group.description;
      event.program = dataForm.main_group.program;
      event.price = Number(dataForm.main_group.price);
      event.organizer = dataForm.main_group.organizer;
      event.address = dataForm.main_group.address;
      event.website = dataForm.main_group.website;
      if (dataForm.main_group.place_id) { event.place_id = dataForm.main_group.place_id; }
      event.phones = this.buildPhones(dataForm.main_group.phones);
    }

    if (linksToPhotos?.length) {
      photos = this.buildPhotos(linksToPhotos);
    }

    if (dataForm.hasOwnProperty('photos_group')) {
      event.main_photo = dataForm.photos_group.main_photo;
    }

    if (dataForm.hasOwnProperty('availability_group')) {
      event.accessibility = dataForm.availability_group.accessibility;
      event.child_friendly = dataForm.availability_group.child_friendly;
      event.dog_friendly = dataForm.availability_group.dog_friendly;
    }

    if (dataForm.hasOwnProperty('schedule_group')) {
      const schedule: IScheduleGroup = this.buildSchedule(dataForm.schedule_group);
      event.start_time = schedule.start_time;
      event.end_time = schedule.end_time;
    }

    result.event = event;
    result.photos = photos;

    return result;
  }

  public saveEvent(eventData: Partial<IEvent>): Observable<any> {
    return this.http.post<any>(this.apiUrlService.generateApiLink('events'), eventData);
  }

  public getEventsFromDate(options: EventsRequestParamsHelper): Observable<IEventsResponse> {
    let params: HttpParams = new HttpParams();
    const eventRequestParams: Partial<IEventRequestParams> = options.toJSON();

    for (const key in eventRequestParams) {
      if (!eventRequestParams.hasOwnProperty(key)){ continue; }
      params = params.set(key, eventRequestParams[key]);
    }

    return this.http.get<IEventsResponse>(this.apiUrlService.generateApiLink('events'), { params });
    // return this.http.get<IEvent[]>('http://localhost:3001/events', { params });
  }

  public getEventsNow(page: number = 1, limit: number = 6): Observable<IEventsResponse> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IEventsResponse>(this.apiUrlService.generateApiLink('events/now'), { params });
    // return this.http.get<IEvent[]>('http://localhost:3001/events-now', { params });
  }

  public getEventById(eventId: string): Observable<IEventResponse> {
    return this.http.get<IEventResponse>(this.apiUrlService.generateApiLink(`events/${eventId}`));
    // return this.http.get<IEvent>(`http://localhost:3001/events/${eventId}`);
  }

  public getEventsByPlaceId(placeId: string, page: number = 1, limit: number = 2): Observable<IEventsResponse> {
    let params: HttpParams = new HttpParams();
    params = params.set('place_id', placeId.toString());
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IEventsResponse>(this.apiUrlService.generateApiLink(`events`), { params });
  }
}
