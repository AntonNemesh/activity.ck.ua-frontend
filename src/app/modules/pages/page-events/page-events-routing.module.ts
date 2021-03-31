import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageEventDetailsComponent, PageEventsListComponent } from './components';

const routes: Routes = [
  { path: '', component: PageEventsListComponent },
  { path: ':event_id', component: PageEventDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageEventsRoutingModule { }
