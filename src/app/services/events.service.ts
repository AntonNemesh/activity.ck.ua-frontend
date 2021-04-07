import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IEvent, IPlace} from '../static/type';
import { ApiUrlService } from './api-url.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  getEventsFromDate(date: number, page: number = 1, limit: number = 6): Observable<IEvent[]> {
    let params: HttpParams = new HttpParams();

    params = params.set('start_time', date.toString());
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    // return this.http.get<IEvent[]>(this.apiUrlService.generateApiLink('events'), { params });
    return this.http.get<IEvent[]>('http://localhost:3001/events', { params });
  }

  public getEventById(eventId: string): Observable<IEvent> {
    // return this.http.get<IEvent>(this.apiUrlService.generateApiLink(`events/${eventId}`));
    return this.http.get<IEvent>(`http://localhost:3001/events/${eventId}`);
  }
}
