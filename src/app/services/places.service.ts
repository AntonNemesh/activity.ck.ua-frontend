import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';
import { IPlace, IPlaceRequestParams } from '../static/type';
import { PlacesRequestParamsHelper } from '../helpers';
import { map } from 'rxjs/operators';
// import DATABASE from './../../../api/database.json';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  private limit: number = 5;

  public getLimit(): number {
    return this.limit;
  }

  // public amountPages(options: Partial<IPlaceRequestParams>): number {
  //   let counter: number = 0;
  //   DATABASE.places.forEach((item) => {
  //     if (options.type_id !== undefined) {
  //       if (Object.keys(options).length === 1) {
  //         if (item.type_id === options.type_id &&
  //           options.accessibility === undefined &&
  //           options.dog_friendly === undefined &&
  //           options.child_friendly === undefined) { counter++; return; }
  //         return;
  //       }
  //       if (Object.keys(options).length === 2) {
  //         if (item.type_id === options.type_id &&
  //           item.accessibility === options.accessibility) { counter++; return; }
  //
  //         if (item.type_id === options.type_id &&
  //           item.child_friendly === options.child_friendly) { counter++; return; }
  //
  //         if (item.type_id === options.type_id &&
  //           item.dog_friendly === options.dog_friendly) { counter++; return; }
  //         return;
  //       }
  //       if (Object.keys(options).length === 3) {
  //         if (item.type_id === options.type_id &&
  //           item.accessibility === options.accessibility &&
  //           item.child_friendly === options.child_friendly) { counter++; return; }
  //
  //         if (item.type_id === options.type_id &&
  //           item.accessibility === options.accessibility &&
  //           item.dog_friendly === options.dog_friendly) { counter++; return; }
  //
  //         if (item.type_id === options.type_id &&
  //           item.child_friendly === options.child_friendly &&
  //           item.dog_friendly === options.dog_friendly) { counter++; return; }
  //         return;
  //       }
  //       if (Object.keys(options).length === 4) {
  //         if (item.type_id === options.type_id &&
  //           item.accessibility === options.accessibility &&
  //           item.child_friendly === options.child_friendly &&
  //           item.dog_friendly === options.dog_friendly) { counter++; return; }
  //         return;
  //       }
  //       return;
  //     }
  //     if (options.category_id !== undefined) {
  //       if (Object.keys(options).length === 1) {
  //         if (item.category_id === options.category_id &&
  //           options.accessibility === undefined &&
  //           options.dog_friendly === undefined &&
  //           options.child_friendly === undefined) { counter++; return; }
  //         return;
  //       }
  //       if (Object.keys(options).length === 2) {
  //         if (item.category_id === options.category_id &&
  //           item.accessibility === options.accessibility) { counter++; return; }
  //
  //         if (item.category_id === options.category_id &&
  //           item.child_friendly === options.child_friendly) { counter++; return; }
  //
  //         if (item.category_id === options.category_id &&
  //           item.dog_friendly === options.dog_friendly) { counter++; return; }
  //         return;
  //       }
  //       if (Object.keys(options).length === 3) {
  //         if (item.category_id === options.category_id &&
  //           item.accessibility === options.accessibility &&
  //           item.child_friendly === options.child_friendly) { counter++; return; }
  //
  //         if (item.category_id === options.category_id &&
  //           item.accessibility === options.accessibility &&
  //           item.dog_friendly === options.dog_friendly) { counter++; return; }
  //
  //         if (item.category_id === options.category_id &&
  //           item.child_friendly === options.child_friendly &&
  //           item.dog_friendly === options.dog_friendly) { counter++; return; }
  //         return;
  //       }
  //       if (Object.keys(options).length === 4) {
  //         if (item.category_id === options.category_id &&
  //           item.accessibility === options.accessibility &&
  //           item.child_friendly === options.child_friendly &&
  //           item.dog_friendly === options.dog_friendly) { counter++; return; }
  //         return;
  //       }
  //       return;
  //     }
  //   });
  //   return (counter / this.getLimit() >= 1) ? Math.ceil(counter / this.getLimit()) : 1;
  // }

  public savePlace(placeData: Partial<IPlace>): Observable<IPlace> {
    return this.http.post<IPlace>(this.apiUrlService.generateApiLink('places'), placeData);
  }

  public getPlaces(options: PlacesRequestParamsHelper): Observable<IPlace[]> {
    let params: HttpParams = new HttpParams();
    const placeRequestParams: Partial<IPlaceRequestParams> = options.toJSON();

    for (const key in placeRequestParams) {
      if (!placeRequestParams.hasOwnProperty(key)){ continue; }
      params = params.set(key, placeRequestParams[key]);
    }
    return this.http.get<IPlace[]>(this.apiUrlService.generateApiLink('places'), { params });
  }

  public getPlaceById(placeId: string): Observable<IPlace> {
    let params: HttpParams = new HttpParams();
    params = params.set('id', placeId);

    return this.http.get<IPlace>(this.apiUrlService.generateApiLink('places'), { params }).pipe(
      map((detailsOfPlace) => detailsOfPlace[0])
    );
  }
}
