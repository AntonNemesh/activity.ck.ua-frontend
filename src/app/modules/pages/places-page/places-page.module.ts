import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesPageViewComponent, DetailsOfPlacePageComponent } from './components';
import { LayoutModule } from '../../layout';
import { PlacesPageRoutingModule } from './places-page-routing.module';
import { FilterByTypeComponent } from './components/filter-by-type/filter-by-type.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PlacesPageViewComponent, DetailsOfPlacePageComponent, DetailsOfPlacePageComponent, FilterByTypeComponent],
  imports: [
    CommonModule,
    LayoutModule,
    PlacesPageRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PlacesPageModule { }
