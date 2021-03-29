import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHomeViewComponent, SectionCategoryComponent, SectionEventsUpcomingComponent } from './components';
import { LayoutModule } from '../../layout';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PageHomeViewComponent,
    SectionCategoryComponent,
    SectionEventsUpcomingComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule
  ]
})
export class PageHomeModule { }
