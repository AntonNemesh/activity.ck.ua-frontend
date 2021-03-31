import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEventDetailsComponent, PageEventsListComponent } from './components';
import { PageEventsRoutingModule } from './page-events-routing.module';
import { LayoutModule } from '../../layout';
import { SharedModule } from '../../shared';
import { MaterialModule } from '../../material';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PageEventsListComponent, PageEventDetailsComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    PageEventsRoutingModule
  ]
})
export class PageEventsModule { }
