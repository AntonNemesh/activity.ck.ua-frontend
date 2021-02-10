import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  constructor() { }

  public generateApiLink(path: string): string {
    return `${environment.apiUrl}/${path}`;
  }
}
