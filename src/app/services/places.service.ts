import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  public getPlaces(category: string, page: number, perPage: number, typeId?: string): Observable<any> {
    let params;

    if (typeId !== undefined) {
      params = {
        _page: String(page),
        _limit: String(perPage),
        typeId
      };
    } else {
      params = {
        categoryId: category,
        _page: String(page),
        _limit: String(perPage),
      };
    }

    return this.http.get(this.apiUrlService.generateApiLink('places'), { params });
  }
}
