import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiUrlService } from './api-url.service';
import { IEventsResponse, IPlacesResponse } from '../static/type';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private apiUrlService: ApiUrlService) { }

  private readonly searchText$: Subject<string> = new Subject();

  public setSearchText(value: string): void {
    this.searchText$.next(value);
  }

  public searchText(): Observable<string> {
    return this.searchText$.asObservable();
  }

  public searchPlacesByText(text: string, page: number, limit: number): Observable<IPlacesResponse> {
    let params: HttpParams = new HttpParams();
    params = params.set('name', text.toString());
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IPlacesResponse>(this.apiUrlService.generateApiLink('search/places'), { params });
  }

  public searchEventsByText(text: string, page: number, limit: number): Observable<IEventsResponse> {
    let params: HttpParams = new HttpParams();
    params = params.set('name', text.toString());
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IEventsResponse>(this.apiUrlService.generateApiLink('search/events'), { params });
  }
}
