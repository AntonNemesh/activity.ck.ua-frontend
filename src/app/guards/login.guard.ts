import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authorizationService: AuthorizationService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isLoggedIn$: Observable<boolean> = this.authorizationService.isLoggedIn$;

    isLoggedIn$.pipe( map((value: boolean) => {
        if (!value) { this.router.navigateByUrl('/home'); }
        return value;
      }) ).subscribe();

    return isLoggedIn$;
  }
}
