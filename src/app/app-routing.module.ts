import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeViewComponent } from './modules/pages/page-home/components';
import { PagePlaceAddComponent } from './modules/pages/page-places/components';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageHomeViewComponent },
  { path: 'places/:category_id', loadChildren: () => import('./modules/pages/page-places').then(m => m.PagePlacesModule) },
  { path: 'events', loadChildren: () => import('./modules/pages/page-events').then(m => m.PageEventsModule) },
  { path: 'add_place', component: PagePlaceAddComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
