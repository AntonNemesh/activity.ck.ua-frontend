import { CategoriesService } from './categories.service';
import { PlacesService } from './places.service';
import { DetailsOfPlaceService } from './details-of-place.service';
import { ApiUrlService } from './api-url.service';
import { FilterByTypeService } from './filter-by-type.service';

export const services = [
  CategoriesService,
  PlacesService,
  DetailsOfPlaceService,
  ApiUrlService,
  FilterByTypeService,
];

export * from './categories.service';
export * from './places.service';
export * from './api-url.service';
export * from './filter-by-type.service';


