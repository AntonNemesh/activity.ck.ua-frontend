import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent, LoadingComponent, GalleryComponent } from './components';
import {MatCarouselModule} from '@ngmodule/material-carousel';




@NgModule({
  declarations: [LoadingComponent, PaginationComponent, GalleryComponent],
  exports: [
    LoadingComponent,
    PaginationComponent,
    GalleryComponent,
  ],
    imports: [
        CommonModule,
        MatCarouselModule,
    ]
})
export class SharedModule { }
