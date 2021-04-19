import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IUser } from '../static/type';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<any> {

  constructor(private usersService: UsersService) { }

  resolve(): IUser|Observable<IUser> {
    if (this.usersService.currentUser) {
      return this.usersService.currentUser;
    }
    return this.usersService.getUserInfo();
  }
}
