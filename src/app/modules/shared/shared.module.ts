import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent, LoadingComponent } from './components';



@NgModule({
  declarations: [LoadingComponent, PaginationComponent],
  exports: [
    LoadingComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
