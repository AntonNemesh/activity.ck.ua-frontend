import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPageViewComponent } from './components';
import { LayoutModule } from '../../layout';



@NgModule({
  declarations: [CategoryPageViewComponent],
  imports: [
    CommonModule,
    LayoutModule,
  ]
})
export class CategoryPageModule { }
