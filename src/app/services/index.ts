import { CategoriesService } from './categories.service';
import { PlacesService } from './places.service';
import { ApiUrlService } from './api-url.service';
import { FilterByTypeService } from './filter-by-type.service';
import { OrganizationsService } from './organizations.service';
import { LoaderService } from './loader.service';

// tslint:disable-next-line:typedef
export const services = [
  CategoriesService,
  PlacesService,
  ApiUrlService,
  FilterByTypeService,
  OrganizationsService,
  LoaderService,
];

export * from './categories.service';
export * from './places.service';
export * from './api-url.service';
export * from './filter-by-type.service';
export * from './organizations.service';
export * from './loader.service';


