import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent } from '../static/type';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  getEventsFromDate(date: number, page: number = 1, limit: number = 6): Observable<IEvent[]> {
    let params: HttpParams = new HttpParams();

    params = params.set('time_start', date.toString());
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IEvent[]>(this.apiUrlService.generateApiLink('events'), { params });
  }
}
