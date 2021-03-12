import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout';
import { SharedModule } from '../../shared';
import {
  PagePlacesListComponent,
  PagePlaceDetailsComponent,
  PagePlaceAddComponent,
  FilterByTypeComponent,
  FilterByToleranceComponent,
} from './components';
import { PagePlacesRoutingModule } from './page-places-routing.module';
import { MaterialModule } from '../../material';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';


@NgModule({
  declarations: [
    PagePlacesListComponent,
    PagePlaceDetailsComponent,
    PagePlaceAddComponent,
    FilterByTypeComponent,
    FilterByToleranceComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    PagePlacesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    TextMaskModule,
    NgxMaterialTimepickerModule,
    GooglePlaceModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCe9dsRGYXGhw_vC-Kf6ifq5dijYaRCWf8',
      authDomain: 'activityckua.firebaseapp.com',
      projectId: 'activityckua',
      storageBucket: 'activityckua.appspot.com',
      messagingSenderId: '122915073098',
      appId: '1:122915073098:web:9dc08801630bdaf7794ab3',
      measurementId: 'G-EHNQ1JJ8YB'
    }),
    AngularFireStorageModule
  ]
})
export class PagePlacesModule { }
