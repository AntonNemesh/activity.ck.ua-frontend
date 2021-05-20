import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthorizationService } from '../services';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable()
export class HeaderModInterceptor implements HttpInterceptor {
  constructor(private authorizationService: AuthorizationService) { }

  public isFailed: boolean = false;

  private handle403Error(): void {
    if (!this.isFailed) {
      this.isFailed = true;
      this.authorizationService.refreshTokens().pipe(
        finalize(() => {
          this.isFailed = false;
          window.location.reload();
        })
      )
        .subscribe(
        (data) => {
          this.authorizationService.accessToken = data.access_token;
          this.authorizationService.refreshToken = data.refresh_token;
        },
        () => {
          this.authorizationService.removeSession();
        }
      );
    }
  }

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
      return next.handle(cloned).pipe(
        tap( () => {
          this.authorizationService.setLogIn();
        }),
        catchError(err => {
          if (err.status === 403) { this.handle403Error(); }
          const error: any = err.error.message || err.statusText;
          return throwError(error);
        })
      );
    }

    if (!req.url.includes('myself')) {
      return next.handle(req);
    }
  }
}
