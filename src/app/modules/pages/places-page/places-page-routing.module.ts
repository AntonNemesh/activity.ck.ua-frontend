import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsOfPlacePageComponent, PlacesPageViewComponent } from './components';

const routes: Routes = [
  { path: '', component: PlacesPageViewComponent },
  { path: ':id', component: DetailsOfPlacePageComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesPageRoutingModule { }
