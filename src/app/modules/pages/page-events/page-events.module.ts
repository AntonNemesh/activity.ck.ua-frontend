import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEventDetailsComponent, PageEventsListComponent, PageEventCreateComponent } from './components';
import { PageEventsRoutingModule } from './page-events-routing.module';
import { LayoutModule } from '../../layout';
import { SharedModule } from '../../shared';
import { MaterialModule } from '../../material';
import { ReactiveFormsModule } from '@angular/forms';
import { PagePlacesRoutingModule } from '../page-places/page-places-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MAT_DATE_LOCALE } from '@angular/material/core';



@NgModule({
  declarations: [PageEventsListComponent, PageEventDetailsComponent, PageEventCreateComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    PageEventsRoutingModule,
    PagePlacesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    TextMaskModule,
    NgxMaterialTimepickerModule,
    GooglePlaceModule,
    AngularFireModule.initializeApp(JSON.parse(ACCESS_CREDENTIALS.FIREBASE_OPTIONS)),
    AngularFireStorageModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'uk-UK' }
  ]
})
export class PageEventsModule { }
