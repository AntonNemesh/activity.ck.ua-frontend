import { Injectable } from '@angular/core';
import { ICategories } from '../static/type';
import { CATEGORIES } from '../static/data';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categories: ICategories[] = CATEGORIES;

  public getAllCategories(): ICategories[] {
    return this.categories;
  }
}
