import { Injectable } from '@angular/core';
import { IPlacesCategories } from '../static/type';
import { PLACES_CATEGORIES } from '../static/data';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categories: IPlacesCategories[] = PLACES_CATEGORIES;

  static getRandomNumbInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public getRandomCategory(): string {
    const randomNumb: number = CategoriesService.getRandomNumbInRange(0, this.categories.length - 1);
    return this.categories[randomNumb].id;
  }

  public getCategories(): IPlacesCategories[] {
    return this.categories;
  }

  public getCategoryNameById(categoryId: string): string {
    let result: string = '';
    this.categories.forEach((category) => {
      if (categoryId !== category.id) { return; }
      result = category.name;
    });
    return result;
  }
}
