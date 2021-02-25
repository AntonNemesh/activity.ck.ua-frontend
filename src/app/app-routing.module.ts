import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageViewComponent } from './modules/pages/home-page/components';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageViewComponent },
  { path: 'places/:category_id', loadChildren: () => import('./modules/pages/places-page').then(m => m.PlacesPageModule) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
