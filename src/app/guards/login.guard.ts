import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authorizationService: AuthorizationService, private router: Router) {
    if (this.authorizationService.isAccessTokenAlive) { this.authorizationService.setLogIn(); }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isLoggedIn$: Observable<boolean> = this.authorizationService.isLoggedIn$;

    isLoggedIn$.pipe( map((value: boolean) => {
        if (!value) { this.router.navigateByUrl('./'); }
        return value;
      }) ).subscribe();

    return isLoggedIn$;
  }
}
