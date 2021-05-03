import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEventDetailsComponent, PageEventsListComponent, PageEventAddComponent } from './components';
import { PageEventsRoutingModule } from './page-events-routing.module';
import { LayoutModule } from '../../layout';
import { SharedModule } from '../../shared';
import { MaterialModule } from '../../material';
import { ReactiveFormsModule } from '@angular/forms';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';



@NgModule({
  declarations: [PageEventsListComponent, PageEventDetailsComponent, PageEventAddComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    PageEventsRoutingModule,
    GooglePlaceModule
  ]
})
export class PageEventsModule { }
