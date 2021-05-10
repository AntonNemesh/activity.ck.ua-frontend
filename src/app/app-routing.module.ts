import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeViewComponent } from './modules/pages/page-home/components';
import { PagePlaceAddComponent } from './modules/pages/page-places/components';
import { PageUserViewComponent } from './modules/pages/page-user/components';
import { PageAuthorizationViewComponent } from './modules/pages/page-authorization/components';
import { UsersResolverService } from './services';
import { AuthorizationGuard } from './guards';
import { PageSearchResultsViewComponent } from './modules/pages/page-search-results/components';
import { PageEventCreateComponent } from './modules/pages/page-events/components';

const routes: Routes = [
  { path: '',
    resolve: { user: UsersResolverService },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: PageHomeViewComponent },
      { path: 'search', component: PageSearchResultsViewComponent },
      { path: 'user', component: PageUserViewComponent, canActivate: [AuthorizationGuard] },
      { path: 'add_place', component: PagePlaceAddComponent, canActivate: [AuthorizationGuard] },
      { path: 'event_create', component: PageEventCreateComponent, canActivate: [AuthorizationGuard] },
      { path: 'authorization', component: PageAuthorizationViewComponent, canActivate: [AuthorizationGuard] },
      { path: 'places/:category_id', loadChildren: () => import('./modules/pages/page-places').then(m => m.PagePlacesModule) },
      { path: 'events', loadChildren: () => import('./modules/pages/page-events').then(m => m.PageEventsModule) },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthorizationGuard]
})
export class AppRoutingModule { }
