import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesPageViewComponent, DetailsOfPlacePageComponent } from './components';
import { LayoutModule } from '../../layout';
import { PlacesPageRoutingModule } from './places-page-routing.module';
import { FilterByTypeComponent } from './components/filter-by-type/filter-by-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterByToleranceComponent } from './components/tolerance-filter/tolerance-filter/filter-by-tolerance.component';



@NgModule({
  declarations: [
    PlacesPageViewComponent,
    DetailsOfPlacePageComponent,
    DetailsOfPlacePageComponent,
    FilterByTypeComponent,
    FilterByToleranceComponent],
  imports: [
    CommonModule,
    LayoutModule,
    PlacesPageRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PlacesPageModule { }
