import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlService } from './api-url.service';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  public get isLoggedIn(): boolean {
    return this.accessToken !== null;
  }

  public get accessToken(): string|null {
    return localStorage.getItem('accessToken');
  }

  public set accessToken(value: string) {
    localStorage.setItem('accessToken', value);
  }

  public get refreshToken(): string|null {
    return localStorage.getItem('refreshToken');
  }

  public set refreshToken(value: string) {
    localStorage.setItem('refreshToken', value);
  }

  public login(authData: any): any {
    return this.http.post<any>(this.apiUrlService.generateApiLink('auth/login'), authData);
  }

  public registration(): void {

  }
}
