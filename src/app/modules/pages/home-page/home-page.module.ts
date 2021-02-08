import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageViewComponent, CategorySectionComponent } from './components';
import { LayoutModule } from '../../layout';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [HomePageViewComponent, CategorySectionComponent],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule
  ]
})
export class HomePageModule { }
