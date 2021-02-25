import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout';
import { SharedModule } from '../../shared';
import { PlacesPageViewComponent, DetailsOfPlacePageComponent, FilterByTypeComponent, FilterByToleranceComponent } from './components';
import { PlacesPageRoutingModule } from './places-page-routing.module';


@NgModule({
  declarations: [
    PlacesPageViewComponent,
    DetailsOfPlacePageComponent,
    FilterByTypeComponent,
    FilterByToleranceComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    PlacesPageRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PlacesPageModule { }
