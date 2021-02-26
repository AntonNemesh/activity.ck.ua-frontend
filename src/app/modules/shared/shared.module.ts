import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent, LoadingComponent } from './components';
import { GalleryComponent } from './gallery/gallery.component';



@NgModule({
  declarations: [
    LoadingComponent,
    PaginationComponent,
    GalleryComponent,
  ],
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
