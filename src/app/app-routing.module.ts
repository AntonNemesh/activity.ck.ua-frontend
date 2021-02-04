import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageViewComponent } from './modules/pages/home-page/components';
import { CategoryPageViewComponent } from './modules/pages/category-page/components';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageViewComponent },
  { path: 'category', component: CategoryPageViewComponent },
  // { path: 'category', loadChildren: () => import('./modules/pages/category-page').then(m => m.CategoryPageModule) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
