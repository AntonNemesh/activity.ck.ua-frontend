import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHomeViewComponent, SectionCategoryComponent, SectionEventsUpcomingComponent } from './components';
import { LayoutModule } from '../../layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageHomeViewComponent,
    SectionCategoryComponent,
    SectionEventsUpcomingComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PageHomeModule { }
