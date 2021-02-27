import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent, LoadingComponent, GalleryComponent } from './components';



@NgModule({
  declarations: [LoadingComponent, PaginationComponent, GalleryComponent],
  exports: [
    LoadingComponent,
    PaginationComponent,
    GalleryComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
