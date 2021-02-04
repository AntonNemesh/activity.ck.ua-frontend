import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent, LayoutHeaderComponent, LayoutFooterComponent } from './components/';
import { AppRoutingModule } from '../../app-routing.module';



@NgModule({
  declarations: [LayoutComponent, LayoutHeaderComponent, LayoutFooterComponent],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ]
})
export class LayoutModule { }
