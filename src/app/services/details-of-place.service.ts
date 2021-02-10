import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsOfPlaceService {
  constructor(private http: HttpClient) {
  }

  public getDetailsOfPlace(placeId): Observable<any> {
    const params = {
      id: placeId
    };
    return this.http.get('http://localhost:3000/places/id', {params});
  }
}
