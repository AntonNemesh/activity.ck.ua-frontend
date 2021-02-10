import { CategoriesService } from './categories.service';
import { PlacesService } from './places.service';
import {DetailsOfPlaceService} from './details-of-place.service';

export const services = [
  CategoriesService,
  PlacesService,
  DetailsOfPlaceService
];

export * from './categories.service';
export * from './places.service';


