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
      if (options.type_id !== undefined) {
        if (Object.keys(options).length === 1) {
          if (item.type_id === options.type_id &&
            options.accessibility === undefined &&
            options.dog_friendly === undefined &&
            options.child_friendly === undefined) { counter++; return; }
          return;
        }
        if (Object.keys(options).length === 2) {
          if (item.type_id === options.type_id &&
            item.accessibility === options.accessibility) { counter++; return; }

          if (item.type_id === options.type_id &&
            item.child_friendly === options.child_friendly) { counter++; return; }

          if (item.type_id === options.type_id &&
            item.dog_friendly === options.dog_friendly) { counter++; return; }
          return;
        }
        if (Object.keys(options).length === 3) {
          if (item.type_id === options.type_id &&
            item.accessibility === options.accessibility &&
            item.child_friendly === options.child_friendly) { counter++; return; }

          if (item.type_id === options.type_id &&
            item.accessibility === options.accessibility &&
            item.dog_friendly === options.dog_friendly) { counter++; return; }

          if (item.type_id === options.type_id &&
            item.child_friendly === options.child_friendly &&
            item.dog_friendly === options.dog_friendly) { counter++; return; }
          return;
        }
        if (Object.keys(options).length === 4) {
          if (item.type_id === options.type_id &&
            item.accessibility === options.accessibility &&
            item.child_friendly === options.child_friendly &&
            item.dog_friendly === options.dog_friendly) { counter++; return; }
          return;
        }
        return;
      }
      if (options.category_id !== undefined) {
        if (Object.keys(options).length === 1) {
          if (item.category_id === options.category_id &&
            options.accessibility === undefined &&
            options.dog_friendly === undefined &&
            options.child_friendly === undefined) { counter++; return; }
          return;
        }
        if (Object.keys(options).length === 2) {
          if (item.category_id === options.category_id &&
            item.accessibility === options.accessibility) { counter++; return; }

          if (item.category_id === options.category_id &&
            item.child_friendly === options.child_friendly) { counter++; return; }

          if (item.category_id === options.category_id &&
            item.dog_friendly === options.dog_friendly) { counter++; return; }
          return;
        }
        if (Object.keys(options).length === 3) {
          if (item.category_id === options.category_id &&
            item.accessibility === options.accessibility &&
            item.child_friendly === options.child_friendly) { counter++; return; }

          if (item.category_id === options.category_id &&
            item.accessibility === options.accessibility &&
            item.dog_friendly === options.dog_friendly) { counter++; return; }

          if (item.category_id === options.category_id &&
            item.child_friendly === options.child_friendly &&
            item.dog_friendly === options.dog_friendly) { counter++; return; }
          return;
        }
        if (Object.keys(options).length === 4) {
          if (item.category_id === options.category_id &&
            item.accessibility === options.accessibility &&
            item.child_friendly === options.child_friendly &&
            item.dog_friendly === options.dog_friendly) { counter++; return; }
          return;
        }
        return;
      }
    });
    return (counter / this.getPerPage() >= 1) ? Math.ceil(counter / this.getPerPage()) : 1;
  }

  public getPlaces(options): Observable<any> {
    const params = {};
    for (const key in options) {
      if (!options.hasOwnProperty(key)) { continue; }
      params[key] = String(options[key]);
    }
    return this.http.get(this.apiUrlService.generateApiLink('places'), { params });
  }

}
