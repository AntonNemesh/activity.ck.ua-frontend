import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDetailsOfPlace } from '../static/type/details-of-place.interface';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsOfPlaceService {
  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) {
  }

  public getDetailsOfPlace(placeId: string): Observable<IDetailsOfPlace> {
    const params = {
      id: placeId
    };
    return this.http.get<IDetailsOfPlace>(this.apiUrlService.generateApiLink('places'), { params });
  }
}
