import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IDetailsOfPlaceInterface, IPlacesTypes} from '../static/type';

@Injectable({
  providedIn: 'root'
})
export class DetailsOfPlaceService {
  constructor(private http: HttpClient) {
  }

  public getDetailsOfPlace(placeId: string): Observable<IDetailsOfPlaceInterface> {
    const params = {
      id: placeId
    };
    return this.http.get<IDetailsOfPlaceInterface>('http://localhost:3000/places', {params});
  }
}
