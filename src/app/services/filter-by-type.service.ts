import { Injectable } from '@angular/core';
import { PLACES_TYPES } from '../static/data';
import { IPlacesTypes } from '../static/type';

@Injectable({
  providedIn: 'root'
})
export class FilterByTypeService {
  public types: IPlacesTypes[] = PLACES_TYPES;

  constructor() { }
  public getTypes(categoryId: string): IPlacesTypes[] {
    const types: IPlacesTypes[] = [];
    this.types.forEach((type) => {
      if (type.category_id !== categoryId) { return; }
      types.push(type);
    });
    return types;
  }
}
