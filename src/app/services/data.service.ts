import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiUrlService} from './api-url.service';
import {OrganizationsService} from './organizations.service';
import {IPlacesResponse} from '../static/type';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private apiUrlService: ApiUrlService) { }

  searchByText(text: string, page: number = 1, limit: number = 100): any {
    let params: HttpParams = new HttpParams();
    params = params.set('name', text.toString());
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<any>(this.apiUrlService.generateApiLink('search'), { params });
  }
}
