import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PageHomeViewComponent,
  SectionCategoryComponent,
  SectionEventsUpcomingComponent,
  SectionEventsRightNowComponent } from './components';
import { LayoutModule } from '../../layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import {PagePlacesModule} from '../page-places';


@NgModule({
  declarations: [
    PageHomeViewComponent,
    SectionCategoryComponent,
    SectionEventsUpcomingComponent,
    SectionEventsRightNowComponent
  ],
    imports: [
        CommonModule,
        LayoutModule,
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule,
        PagePlacesModule
    ]
})
export class PageHomeModule { }
