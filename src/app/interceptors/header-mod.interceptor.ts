import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthorizationService} from '../services';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class HeaderModInterceptor implements HttpInterceptor {
  constructor(private authorizationService: AuthorizationService) {}

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const refreshToken: string|null = this.authorizationService.refreshToken;
    if (refreshToken && req.url.includes('auth/refresh')) {
      const cloned: any = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + refreshToken)
      });
      return next.handle(cloned);
    }

    const accessToken: string|null = this.authorizationService.accessToken;
    if (accessToken && req.url.includes('api/v1')) {
      const cloned: any = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + accessToken)
      });
      return next.handle(cloned);
    }

    if (!req.url.includes('myself')) {
      return next.handle(req);
    }
  }
}