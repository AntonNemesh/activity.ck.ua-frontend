import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent, LayoutHeaderComponent, LayoutFooterComponent } from './components/';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LayoutComponent, LayoutHeaderComponent, LayoutFooterComponent],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class LayoutModule { }
