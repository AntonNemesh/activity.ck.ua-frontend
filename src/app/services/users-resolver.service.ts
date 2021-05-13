import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IUser } from '../static/type';
import { UsersService } from './users.service';
import {Observable, of} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {AuthorizationService} from './authorization.service';


@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<any> {

  constructor(private usersService: UsersService, private authorizationService: AuthorizationService) { }

  resolve(): IUser|Observable<IUser> {
    if (this.usersService.currentUser) {
      return this.usersService.currentUser;
    }
    return this.usersService.getUserInfo().pipe(
      tap((data) => {
        this.authorizationService.setLogIn();
      }),
      catchError((data) => {
        this.authorizationService.updateTokens();
        this.authorizationService.setLogOut();
        return of(false);
      })
    );
  }
}
