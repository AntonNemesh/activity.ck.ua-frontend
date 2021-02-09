import { Injectable } from '@angular/core';
import { ICategories } from '../static/type';
import { CATEGORIES } from '../static/data';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categories: ICategories[] = CATEGORIES;
  private catID: string[] = ['children', 'recreation', 'extreme', 'todo_something', 'culture',  'history',
    'unique_things',  'sleeping',  'inspired_city', 'gastronomic_adventures'];

  private getRandomNumbInRange(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public getRandomCategory(): string {
    const randomNumb = this.getRandomNumbInRange(0, this.catID.length);
    return this.catID[randomNumb];
  }

  public getAllCategories(): ICategories[] {
    return this.categories;
  }
}
