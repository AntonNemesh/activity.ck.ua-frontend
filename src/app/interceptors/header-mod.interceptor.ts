import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthorizationService} from '../services';

@Injectable()
export class HeaderModInterceptor implements HttpInterceptor {

  constructor(private authorizationService: AuthorizationService) {}

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string|null = this.authorizationService.accessToken;
    if (token) {
      const cloned: any = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + token)
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
