import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagePlaceDetailsComponent, PagePlacesListComponent } from './components';

const routes: Routes = [
  { path: '', component: PagePlacesListComponent },
  { path: ':place_id', component: PagePlaceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagePlacesRoutingModule { }
