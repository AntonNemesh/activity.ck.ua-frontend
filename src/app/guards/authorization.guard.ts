import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authorizationService: AuthorizationService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn: boolean = this.authorizationService.isLoggedIn;
    const isLoggedInStream: Observable<boolean> = this.authorizationService.isLoggedInStream;
    isLoggedInStream.subscribe((value) => {
      console.log('isLoggedInStream = ', value);
    });
    if (isLoggedIn) {
      console.log('GUARD = ', isLoggedIn, route.url[0].path);
      if (route.url[0].path === 'authorization') {
        this.router.navigateByUrl('home');
        return false;
      }
      return true;
    } else {
      console.log('GUARD = ', isLoggedIn, route.url[0].path);
      if (route.url[0].path === 'authorization') {
        return true;
      }
      this.router.navigateByUrl('home');
      return false;
    }
  }
}
