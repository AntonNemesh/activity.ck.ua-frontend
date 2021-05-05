import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiUrlService } from './api-url.service';
import { Observable } from 'rxjs';
import { IEventsResponse, IPlacesResponse, IUser, IUserResponse } from '../static/type';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  public currentUser: IUser;

  public getUserInfo(): Observable<IUser|any> {
    return this.http.get<IUserResponse>(this.apiUrlService.generateApiLink('users/myself'))
      .pipe(
        map(data => data.user),
        tap(data => this.currentUser = data.user)
      );
  }

  public getVisitedPlaces(page: number, limit: number): Observable<IPlacesResponse> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IPlacesResponse>(this.apiUrlService.generateApiLink('users/myself/visited_places'), { params });
    // return this.http.get<IObjectActivity[]>('http://localhost:3001/users-myself-visited_places', { params });
  }

  public getFavoritePlaces(page: number, limit: number): Observable<IPlacesResponse> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IPlacesResponse>(this.apiUrlService.generateApiLink('users/myself/favorite_places'), { params });
    // return this.http.get<IObjectActivity[]>('http://localhost:3001/users-myself-favorite_places', { params });
  }

  public getCreatedPlaces(page: number, limit: number): Observable<IPlacesResponse> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IPlacesResponse>(this.apiUrlService.generateApiLink('users/myself/created_places'), { params });
    // return this.http.get<IObjectActivity[]>('http://localhost:3001/users-myself-created_places', { params });
  }

  public getCreatedEvents(page: number, limit: number): Observable<IEventsResponse> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IEventsResponse>(this.apiUrlService.generateApiLink('users/myself/created_events'), { params });
    // return this.http.get<IObjectActivity[]>('http://localhost:3001/users-myself-created_events', { params });
  }

  public getScheduledEvents(page: number, limit: number): Observable<IEventsResponse> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IEventsResponse>(this.apiUrlService.generateApiLink('users/myself/scheduled_events'), { params });
    // return this.http.get<IObjectActivity[]>('http://localhost:3001/users-myself-scheduled_events', { params });
  }

  public getExplore(categoryId?: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    if (categoryId) { params = params.set('category_id', categoryId); }

    return this.http.get<any>(this.apiUrlService.generateApiLink('users/myself/explore'), { params });
  }

  public addPlaceToFavorite(placeId: string): Observable<any> {
    return this.http.post<any>(this.apiUrlService.generateApiLink(`users/myself/favorite_places/${placeId}`), null);
  }

  public removePlaceFromFavorite(placeId: string): Observable<any> {
    return this.http.delete<any>(this.apiUrlService.generateApiLink(`users/myself/favorite_places/${placeId}`));
  }

  public addPlaceToVisited(placeId: string): Observable<any> {
    return this.http.post<any>(this.apiUrlService.generateApiLink(`users/myself/visited_places/${placeId}`), null);
  }

  public removePlaceFromVisited(placeId: string): Observable<any> {
    return this.http.delete<any>(this.apiUrlService.generateApiLink(`users/myself/visited_places/${placeId}`));
  }

  public addEventToScheduled(eventId: string): Observable<any> {
    return this.http.post<any>(this.apiUrlService.generateApiLink(`users/myself/scheduled_events/${eventId}`), null);
  }

  public removeEventFromScheduled(eventId: string): Observable<any> {
    return this.http.delete<any>(this.apiUrlService.generateApiLink(`users/myself/scheduled_events/${eventId}`));
  }
}
