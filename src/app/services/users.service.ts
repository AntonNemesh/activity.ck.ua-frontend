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
    return this.http.get<IUser>(this.apiUrlService.generateApiLink('users'));
  }

  getUserActivity(page: number, limit: number): Observable<IUserActivity> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IUserActivity>(this.apiUrlService.generateApiLink('users-activity'), { params });
  }

  getVisitedPlaces(page: number, limit: number): Observable<IObjectActivity[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IObjectActivity[]>(this.apiUrlService.generateApiLink('users-activity-visited_places'), { params });
  }

  getFavoritePlaces(page: number, limit: number): Observable<IObjectActivity[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IObjectActivity[]>(this.apiUrlService.generateApiLink('users-activity-favorite_places'), { params });
  }

  getUserPlaces(page: number, limit: number): Observable<IObjectActivity[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IObjectActivity[]>(this.apiUrlService.generateApiLink('users-activity-user_places'), { params });
  }

  getUserEvents(page: number, limit: number): Observable<IObjectActivity[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IObjectActivity[]>(this.apiUrlService.generateApiLink('users-activity-user_events'), { params });
  }

  getScheduledEvents(page: number, limit: number): Observable<IObjectActivity[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IObjectActivity[]>(this.apiUrlService.generateApiLink('users-activity-scheduled_events'), { params });
  }
}
