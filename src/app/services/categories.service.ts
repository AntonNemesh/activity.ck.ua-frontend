import { Injectable } from '@angular/core';
import { IPlacesCategories } from '../static/type';
import { PLACES_CATEGORIES } from '../static/data';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categories: IPlacesCategories[] = PLACES_CATEGORIES;

  static getRandomNumbInRange(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public getRandomCategory(): string {
    const randomNumb = CategoriesService.getRandomNumbInRange(0, this.categories.length - 1);
    return this.categories[randomNumb].id;
  }

  public getCategories(): IPlacesCategories[] {
    return this.categories;
  }
}
