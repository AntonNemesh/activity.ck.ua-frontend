import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { ApiUrlService } from './api-url.service';
import { Observable } from 'rxjs';
import { IUser, IUserActivity } from '../static/type';
import {IObjectActivity} from '../static/type/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  getUserInfo(): Observable<IUser> {
    // return this.http.get<IUser>(this.apiUrlService.generateApiLink('users/myself'));
    return this.http.get<IUser>('http://localhost:3001/users-myself');
  }

  getVisitedPlaces(page: number, limit: number): Observable<IObjectActivity[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    // return this.http.get<IObjectActivity[]>(this.apiUrlService.generateApiLink('users/myself/visited_places'), { params });
    return this.http.get<IObjectActivity[]>('http://localhost:3001/users-myself-visited_places', { params });
  }

  getFavoritePlaces(page: number, limit: number): Observable<IObjectActivity[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    // return this.http.get<IObjectActivity[]>(this.apiUrlService.generateApiLink('users/myself/favorite_places'), { params });
    return this.http.get<IObjectActivity[]>('http://localhost:3001/users-myself-favorite_places', { params });
  }

  getCreatedPlaces(page: number, limit: number): Observable<IObjectActivity[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    // return this.http.get<IObjectActivity[]>(this.apiUrlService.generateApiLink('users/myself/created_places'), { params });
    return this.http.get<IObjectActivity[]>('http://localhost:3001/users-myself-created_places', { params });
  }

  getCreatedEvents(page: number, limit: number): Observable<IObjectActivity[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    // return this.http.get<IObjectActivity[]>(this.apiUrlService.generateApiLink('users/myself/created_events'), { params });
    return this.http.get<IObjectActivity[]>('http://localhost:3001/users-myself-created_events', { params });
  }

  getScheduledEvents(page: number, limit: number): Observable<IObjectActivity[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    // return this.http.get<IObjectActivity[]>(this.apiUrlService.generateApiLink('users/myself/scheduled_events'), { params });
    return this.http.get<IObjectActivity[]>('http://localhost:3001/users-myself-scheduled_events', { params });
  }
}
