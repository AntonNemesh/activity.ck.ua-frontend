import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlService } from './api-url.service';
import { Observable } from 'rxjs';
import { IUser, IUserActivity } from '../static/type';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  getUserInfo(): Observable<IUser> {
    return this.http.get<IUser>(this.apiUrlService.generateApiLink('users'));
  }

  getUserActivity(): Observable<IUserActivity> {
    return this.http.get<IUserActivity>(this.apiUrlService.generateApiLink('users-activity'));
  }
}
