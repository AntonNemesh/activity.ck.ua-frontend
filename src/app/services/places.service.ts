import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }

  public getPlaces(currentCategory: string, itemsPerPage?: number, currentPage?: number): Observable<any> {
    const params = {
      _limit: undefined,
      _page: undefined,
      idCategory: currentCategory,
    };
    if (itemsPerPage !== undefined) { params._limit = String(itemsPerPage); }
    if (currentPage !== undefined) { params._page = String(currentPage); }

    return this.http.get('http://localhost:3000/places', { params });
  }
}
