import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEventResponse, IEventsResponse } from '../static/type';
import { ApiUrlService } from './api-url.service';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  public getEventsFromDate(date: number, page: number = 1, limit: number = 6): Observable<IEventsResponse> {
    let params: HttpParams = new HttpParams();
    params = params.set('start_time', date.toString());
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

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
