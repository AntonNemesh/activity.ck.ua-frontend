import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiUrlService } from './api-url.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  private authorizationState: boolean;

  public get isLoggedIn(): boolean {
    return this.authorizationState;
  }

  public set isLoggedIn(value: boolean) {
    this.authorizationState = value;
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

  public logout(): any {
    return this.http.get<any>(this.apiUrlService.generateApiLink('auth/logout'));
  }

  private getNewTokens(): any {
    return this.http.get<any>(this.apiUrlService.generateApiLink('auth/refresh'));
  }

  public updateTokens(): void {
    if (!this.accessToken || !this.refreshToken) { return; }
    this.getNewTokens().subscribe((data) => {
      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
    });
  }

  public deleteTokens(): void {
    this.isLoggedIn = false;
    localStorage.clear();
  }

  public getLifeCycleOfAccessToken(): number {
    if (!this.accessToken) { return; }
    const time: string = JSON.parse(window.atob(this.accessToken.split('.')[1])).exp + '000';
    return Math.floor((+time - +Date.now()) / 60000);
  }

  public registration(): void {

  }
}
