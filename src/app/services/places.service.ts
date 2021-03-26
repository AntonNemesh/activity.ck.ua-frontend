import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';
import {
  IOrganizations,
  IPhotos,
  IPlace,
  IPlaceForm,
  IPlaceRequestParams,
  IWorkTime,
  IWorkTimeForm
} from '../static/type';
import { PlacesRequestParamsHelper } from '../helpers';
import { map } from 'rxjs/operators';
import { OrganizationsService } from './organizations.service';
// import DATABASE from './../../../api/database.json';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(
    private http: HttpClient,
    private apiUrlService: ApiUrlService,
    private organizationsService: OrganizationsService) { }

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

  public buildWorkTime(workTime: IWorkTimeForm): IWorkTime {
    const result: IWorkTime = {};
    for (const key in workTime) {
      if (!workTime.hasOwnProperty(key) || workTime[key] === null) { continue; }
      const day: string = key.slice(0, 3);
      const limit: string = key.slice(4);
      if (!result.hasOwnProperty(day)) {
        result[day] = { [limit]: workTime[key] };
      } else {
        result[day][limit] = workTime[key];
      }
    }
    return result;
  }

  public buildPhotos(urls: string[]): IPhotos[] {
    const result: IPhotos[] = [];
    urls.forEach((url) => { result.push({url}); });
    return result;
  }

  public buildPhones(phones: string[]): string[] {
    const result: string[] = [];
    phones.forEach((phone) => {
      result.push(phone.replace(/[^0-9+]/g, ''));
    });
    return result;
  }

  public buildRequest(dataForm: IPlaceForm, linksToPhotos: string[], organizations: IOrganizations): any {
    const result: any = {};
    const place: any = {};
    let photos: IPhotos[] = [];

    if (dataForm.hasOwnProperty('main_group')) {
      place.name = dataForm.main_group.name;
      place.description = dataForm.main_group.description;
      place.address = dataForm.main_group.address;
      place.website = dataForm.main_group.website;
      place.phones = this.buildPhones(dataForm.main_group.phones);
    }

    if (linksToPhotos?.length) {
      photos = this.buildPhotos(linksToPhotos);
    }

    if (dataForm.hasOwnProperty('photos_group')) {
      place.main_photo = dataForm.photos_group.main_photo;
    }

    if (dataForm.hasOwnProperty('tolerance_group')) {
      place.accessibility = dataForm.tolerance_group.accessibility;
      place.child_friendly = dataForm.tolerance_group.child_friendly;
      place.dog_friendly = dataForm.tolerance_group.dog_friendly;
    }

    if (dataForm.hasOwnProperty('work_time_group')) {
      place.work_time = this.buildWorkTime(dataForm.work_time_group);
    }

    if (dataForm.category_group.hasOwnProperty('category_id')) {
      place.category_id = dataForm.category_group.category_id;
    }

    if (dataForm.category_group.hasOwnProperty('type_id')) {
      place.type_id = dataForm.category_group.type_id;
    }

    result.place = place;
    result.photos = photos;

    if (dataForm.organization_group.hasOwnProperty('organization')) {
      if (dataForm.organization_group.organization.hasOwnProperty('email')) {
        result.organization = dataForm.organization_group.organization;
        result.organization.phones = this.buildPhones(dataForm.organization_group.organization.phones);
        return result;
      }
      result.organization_id = this.organizationsService.getOrganizationId(
        organizations.proposedOrganizations,
        dataForm.organization_group.organization.name
      );
      return result;
    }

    result.organization_id = this.organizationsService.getOrganizationId(
      organizations.approvedOrganizations,
      dataForm.organization_group.organization_id
    );
    return result;
  }

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
