import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagePlaceDetailsComponent, PagePlacesListComponent } from './components';
import { UsersResolverService } from '../../../services';

const routes: Routes = [
  { path: '', component: PagePlacesListComponent },
  { path: ':place_id', component: PagePlaceDetailsComponent, resolve: { user: UsersResolverService } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagePlacesRoutingModule { }
