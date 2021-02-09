import { Injectable } from '@angular/core';
import { ICategories } from '../static/type';
import { CATEGORIES } from '../static/data';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categories: ICategories[] = CATEGORIES;

  static getRandomNumbInRange(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public getRandomCategory(): string {
    const randomNumb = CategoriesService.getRandomNumbInRange(0, this.categories.length - 1);
    return this.categories[randomNumb].id;
  }

  public getCategories(): ICategories[] {
    return this.categories;
  }
}
