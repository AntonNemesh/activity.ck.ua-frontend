import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageViewComponent } from './components';
import { LayoutModule } from '../../layout';



@NgModule({
  declarations: [HomePageViewComponent],
  imports: [
    CommonModule,
    LayoutModule
  ]
})
export class HomePageModule { }
