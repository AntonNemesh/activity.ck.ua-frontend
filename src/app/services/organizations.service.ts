import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IOrganization, IPlace} from '../static/type';
import { HttpClient } from '@angular/common/http';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  public getOrganizations(): Observable<IOrganization[]> {
    return this.http.get<IOrganization[]>(this.apiUrlService.generateApiLink('organizations'), {});
  }

  public getOrganizationId(organizations: IOrganization[], name: string): number {
    let result: number = -1;
    organizations.forEach((item) => {
      if (item.name === name) { result = item.id; }
    });
    return result;
  }

  public getOrganizationsNames(organizations: IOrganization[], isApproved: boolean): string[] {
    const result: string[] = [];
    organizations.forEach((item) => {
      if (item.approved !== isApproved) { return; }
      result.push(item.name);
    });
    return result;
  }
}
