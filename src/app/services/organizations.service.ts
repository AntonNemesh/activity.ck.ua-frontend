import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IOrganization, IOrganizations, IPlace} from '../static/type';
import { HttpClient } from '@angular/common/http';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  public getOrganizations(): Observable<IOrganizations> {
    return this.http.get<IOrganizations>(this.apiUrlService.generateApiLink('organizations'), {});
  }

  public getOrganizationId(organizations: IOrganization[], name: string): number {
    let result: number = -1;
    organizations.forEach((item) => {
      if (item.name === name) { result = item.id; }
    });
    return result;
  }

  public getOrganizationsNames(organizations: IOrganization[]): string[] {
    const result: string[] = [];
    organizations.forEach((item) => { result.push(item.name); });
    return result;
  }
}
