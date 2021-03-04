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
}
