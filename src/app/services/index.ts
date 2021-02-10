import { CategoriesService } from './categories.service';
import { PlacesService } from './places.service';
import {DetailsOfPlaceService} from './details-of-place.service';
import { ApiUrlService } from './api-url.service';

export const services = [
  CategoriesService,
  PlacesService,
  DetailsOfPlaceService,
  ApiUrlService,
];

export * from './categories.service';
export * from './places.service';
export * from './api-url.service';


