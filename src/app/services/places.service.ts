import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';

// @ts-ignore
import * as DATABASE from './../../../api/database.json';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  private perPage = 1;

  public getPerPage(): number {
    return this.perPage;
  }

  public amountPages(options): any {
    let counter = 0;

    DATABASE.default.places.forEach((item) => {
      if (options.type !== undefined) {
        if (item.typeId === options.type) { counter++; }
      } else {
        if (item.categoryId === options.category) { counter++; }
      }
    });
    return Math.ceil(counter / this.getPerPage());
  }

  public getPlaces(options): Observable<any> {
    let params;

    if (options.type !== undefined) {
      params = {
        typeId: String(options.type),
        _page: String(options.page),
        _limit: String(options.perPage),
      };
    } else {
      params = {
        categoryId: String(options.category),
        _page: String(options.page),
        _limit: String(options.perPage),
      };
    }

    return this.http.get(this.apiUrlService.generateApiLink('places'), { params });
  }

}
