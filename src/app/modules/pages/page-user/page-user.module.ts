import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageUserViewComponent } from './components';
import { LayoutModule } from '../../layout';
import { SharedModule } from '../../shared';
import { AppRoutingModule } from '../../../app-routing.module';




@NgModule({
  declarations: [PageUserViewComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class PageUserModule { }
