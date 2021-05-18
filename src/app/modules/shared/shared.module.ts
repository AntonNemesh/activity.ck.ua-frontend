import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PaginationComponent,
  LoadingComponent,
  GalleryComponent,
  FilterByAvailabilityComponent,
  FilterByTypeComponent,
  UploaderForPhotosComponent,
  FormReviewComponent,
  RatingViewComponent,
  CommentsViewComponent,
  RatingStarsBarComponent,
  ExploreBarComponent,
} from './components';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MaterialModule } from '../material';
import { ReactiveFormsModule } from '@angular/forms';
import { directives } from '../../directives';


@NgModule({
  declarations: [
    LoadingComponent,
    PaginationComponent,
    GalleryComponent,
    FilterByAvailabilityComponent,
    FilterByTypeComponent,
    UploaderForPhotosComponent,
    FormReviewComponent,
    RatingViewComponent,
    CommentsViewComponent,
    RatingStarsBarComponent,
    ExploreBarComponent,
    ...directives
  ],
  exports: [
    LoadingComponent,
    PaginationComponent,
    GalleryComponent,
    FilterByAvailabilityComponent,
    FilterByTypeComponent,
    UploaderForPhotosComponent,
    FormReviewComponent,
    RatingViewComponent,
    CommentsViewComponent,
    RatingStarsBarComponent,
    ExploreBarComponent,
    ...directives
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatCarouselModule,
  ]
})
export class SharedModule { }
