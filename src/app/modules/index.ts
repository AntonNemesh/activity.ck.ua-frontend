import { LayoutModule } from './layout';
import { PageHomeModule, PagePlacesModule, PageEventsModule } from './pages';
import { SharedModule } from './shared';

// tslint:disable-next-line:typedef
export const modules = [
  LayoutModule,
  PageHomeModule,
  PagePlacesModule,
  PageEventsModule,
  SharedModule
];
