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
        if (Object.keys(options).length === 1) {
          if (item.typeId === options.type &&
            options.accessibility === undefined &&
            options.dogFriendly === undefined &&
            options.childFriendly === undefined) { counter++; return; }
          return;
        }
        if (Object.keys(options).length === 2) {
          if (item.typeId === options.type &&
            item.accessibility === options.accessibility) { counter++; return; }

          if (item.typeId === options.type &&
            item.childFriendly === options.childFriendly) { counter++; return; }

          if (item.typeId === options.type &&
            item.dogFriendly === options.dogFriendly) { counter++; return; }
          return;
        }
        if (Object.keys(options).length === 3) {
          if (item.typeId === options.type &&
            item.accessibility === options.accessibility &&
            item.childFriendly === options.childFriendly) { counter++; return; }

          if (item.typeId === options.type &&
            item.accessibility === options.accessibility &&
            item.dogFriendly === options.dogFriendly) { counter++; return; }

          if (item.typeId === options.type &&
            item.childFriendly === options.childFriendly &&
            item.dogFriendly === options.dogFriendly) { counter++; return; }
          return;
        }
        if (Object.keys(options).length === 4) {
          if (item.typeId === options.type &&
            item.accessibility === options.accessibility &&
            item.childFriendly === options.childFriendly &&
            item.dogFriendly === options.dogFriendly) { counter++; return; }
          return;
        }
        return;
      }
      if (options.category !== undefined) {
        if (Object.keys(options).length === 1) {
          if (item.categoryId === options.category &&
            options.accessibility === undefined &&
            options.dogFriendly === undefined &&
            options.childFriendly === undefined) { counter++; return; }
          return;
        }
        if (Object.keys(options).length === 2) {
          if (item.categoryId === options.category &&
            item.accessibility === options.accessibility) { counter++; return; }

          if (item.categoryId === options.category &&
            item.childFriendly === options.childFriendly) { counter++; return; }

          if (item.categoryId === options.category &&
            item.dogFriendly === options.dogFriendly) { counter++; return; }
          return;
        }
        if (Object.keys(options).length === 3) {
          if (item.categoryId === options.category &&
            item.accessibility === options.accessibility &&
            item.childFriendly === options.childFriendly) { counter++; return; }

          if (item.categoryId === options.category &&
            item.accessibility === options.accessibility &&
            item.dogFriendly === options.dogFriendly) { counter++; return; }

          if (item.categoryId === options.category &&
            item.childFriendly === options.childFriendly &&
            item.dogFriendly === options.dogFriendly) { counter++; return; }
          return;
        }
        if (Object.keys(options).length === 4) {
          if (item.categoryId === options.category &&
            item.accessibility === options.accessibility &&
            item.childFriendly === options.childFriendly &&
            item.dogFriendly === options.dogFriendly) { counter++; return; }
          return;
        }
        return;
      }
    });
    return (counter / this.getPerPage() >= 1) ? Math.ceil(counter / this.getPerPage()) : 1;
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

    if (options.dogFriendly !== undefined)   { params.dogFriendly = options.dogFriendly; }
    if (options.accessibility !== undefined) { params.accessibility = options.accessibility; }
    if (options.childFriendly !== undefined) { params.childFriendly = options.childFriendly; }

    return this.http.get(this.apiUrlService.generateApiLink('places'), { params });
  }

}
