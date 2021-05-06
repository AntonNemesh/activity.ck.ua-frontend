import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSearchResultsViewComponent } from './components';
import { LayoutModule } from '../../layout';
import { SharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material';



@NgModule({
  declarations: [PageSearchResultsViewComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PageSearchResultsModule { }
