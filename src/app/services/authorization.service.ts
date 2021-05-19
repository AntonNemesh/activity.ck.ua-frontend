import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlService } from './api-url.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { IUser } from '../static/type';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  private readonly authorizationStateStream: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public setLogIn(): void {
    this.authorizationStateStream.next(true);
  }

  public setLogOut(): void  {
    this.authorizationStateStream.next(false);
  }

  public get isLoggedIn$(): Observable<boolean> {
    return this.authorizationStateStream.asObservable().pipe(
      distinctUntilChanged()
    );
  }

  public get isLoggedOut$(): Observable<boolean> {
    return this.authorizationStateStream.asObservable().pipe(
      map(value => !value),
      distinctUntilChanged()
    );
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

  public refreshTokens(): any {
    return this.http.get<any>(this.apiUrlService.generateApiLink('auth/refresh'));
  }

  public removeSession(): void {
    this.setLogOut();
    localStorage.clear();
    window.location.replace('/home');
  }

  public createSession(tokens: any): void {
    this.accessToken = tokens.access_token;
    this.refreshToken = tokens.refresh_token;
    window.location.replace('./dist');
  }

  public get isAccessTokenAlive(): boolean {
    if (!this.accessToken) { return; }
    const time: string = JSON.parse(window.atob(this.accessToken.split('.')[1])).exp + '000';
    return Math.floor((+time - +Date.now())) > 0;
  }

  public buildRegistrationRequest(dataForm: any, linksToPhotos: string[]): any {
    const newUser: Partial<IUser> = {};

    newUser.email = dataForm.email;
    newUser.name = dataForm.name;

    if (dataForm.hasOwnProperty('password_group')) {
      newUser.password = dataForm.password_group.password;
    }

    if (linksToPhotos?.length) {
      newUser.avatar = linksToPhotos[0];
    }

    return newUser;
  }

  public registration(newUserData: IUser): any {
    return this.http.post<any>(this.apiUrlService.generateApiLink('auth/registration'), newUserData);
  }
}
