import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout';
import { SharedModule } from '../../shared';
import {
  PagePlacesListComponent,
  PagePlaceDetailsComponent,
  PagePlaceAddComponent,
  FilterByTypeComponent,
  FilterByToleranceComponent,
} from './components';
import { PagePlacesRoutingModule } from './page-places-routing.module';
import { MaterialModule } from '../../material';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [
    PagePlacesListComponent,
    PagePlaceDetailsComponent,
    PagePlaceAddComponent,
    FilterByTypeComponent,
    FilterByToleranceComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    PagePlacesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    TextMaskModule
  ]
})
export class PagePlacesModule { }
