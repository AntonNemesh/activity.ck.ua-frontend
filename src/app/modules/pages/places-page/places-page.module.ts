import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesPageViewComponent, DetailsOfPlacePageComponent } from './components';
import { LayoutModule } from '../../layout';
import { PlacesPageRoutingModule } from './places-page-routing.module';
import { FilterByTypeComponent } from './components/filter-by-type/filter-by-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToleranceFilterComponent } from './components/tolerance-filter/tolerance-filter/tolerance-filter.component';



@NgModule({
  declarations: [
    PlacesPageViewComponent,
    DetailsOfPlacePageComponent,
    DetailsOfPlacePageComponent,
    FilterByTypeComponent,
    ToleranceFilterComponent],
  imports: [
    CommonModule,
    LayoutModule,
    PlacesPageRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PlacesPageModule { }
