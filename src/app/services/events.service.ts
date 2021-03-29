import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {IEvent, IPlaceRequestParams} from '../static/type';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  getEventsByDate(): Observable<IEvent[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', '1');
    params = params.set('_limit', '6');
    return this.http.get<IEvent[]>(this.apiUrlService.generateApiLink('events'), { params });
  }
}
