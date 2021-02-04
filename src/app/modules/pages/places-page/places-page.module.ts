import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesPageViewComponent, DetailsOfPlacePageComponent } from './components';
import { LayoutModule } from '../../layout';
import { PlacesPageRoutingModule } from './places-page-routing.module';



@NgModule({
  declarations: [PlacesPageViewComponent, DetailsOfPlacePageComponent, DetailsOfPlacePageComponent],
  imports: [
    CommonModule,
    LayoutModule,
    PlacesPageRoutingModule,
  ]
})
export class PlacesPageModule { }
