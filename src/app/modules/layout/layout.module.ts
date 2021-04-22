import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent, LayoutHeaderComponent, LayoutFooterComponent } from './components/';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [LayoutComponent, LayoutHeaderComponent, LayoutFooterComponent],
  exports: [
    LayoutComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
    ]
})
export class LayoutModule { }
