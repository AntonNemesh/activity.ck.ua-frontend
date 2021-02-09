import { LayoutModule } from './layout';
import { HomePageModule, PlacesPageModule } from './pages';
import {SharedModule} from './shared/shared.module';

export const modules = [
  LayoutModule,
  HomePageModule,
  PlacesPageModule,
  SharedModule
];
