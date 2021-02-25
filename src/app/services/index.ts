import { CategoriesService } from './categories.service';
import { PlacesService } from './places.service';
import { ApiUrlService } from './api-url.service';
import { FilterByTypeService } from './filter-by-type.service';

export const services = [
  CategoriesService,
  PlacesService,
  ApiUrlService,
  FilterByTypeService,
];

export * from './categories.service';
export * from './places.service';
export * from './api-url.service';
export * from './filter-by-type.service';


