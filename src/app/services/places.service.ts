import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }

  public getPlaces(category: string, page: number, perPage: number): Observable<any> {
    const params = {
      idCategory: category,
      _page: String(page),
      _limit: String(perPage),
    };

    return this.http.get('http://localhost:3000/places', { params });
  }
}
