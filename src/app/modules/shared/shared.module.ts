import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PaginationComponent,
  LoadingComponent,
  GalleryComponent,
  filterByAvailabilityComponent,
  FilterByTypeComponent,
  UploaderForPhotosComponent
} from './components';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MaterialModule } from '../material';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    LoadingComponent,
    PaginationComponent,
    GalleryComponent,
    filterByAvailabilityComponent,
    FilterByTypeComponent,
    UploaderForPhotosComponent
  ],
  exports: [
    LoadingComponent,
    PaginationComponent,
    GalleryComponent,
    filterByAvailabilityComponent,
    FilterByTypeComponent,
    UploaderForPhotosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatCarouselModule,
  ]
})
export class SharedModule { }
