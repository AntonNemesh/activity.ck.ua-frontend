import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PaginationComponent,
  LoadingComponent,
  GalleryComponent,
  FilterByAvailabilityComponent,
  FilterByTypeComponent,
  UploaderForPhotosComponent,
  FormReviewComponent
} from './components';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MaterialModule } from '../material';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    LoadingComponent,
    PaginationComponent,
    GalleryComponent,
    FilterByAvailabilityComponent,
    FilterByTypeComponent,
    UploaderForPhotosComponent,
    FormReviewComponent
  ],
  exports: [
    LoadingComponent,
    PaginationComponent,
    GalleryComponent,
    FilterByAvailabilityComponent,
    FilterByTypeComponent,
    UploaderForPhotosComponent,
    FormReviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatCarouselModule,
  ]
})
export class SharedModule { }
