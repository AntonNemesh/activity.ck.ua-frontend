import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout';
import { SharedModule } from '../../shared';
import {
  PagePlacesListComponent,
  PagePlaceDetailsComponent,
  PagePlaceCreateComponent,
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
        PagePlaceCreateComponent,
    ],
    exports: [
        PagePlacesListComponent
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
        AngularFireModule.initializeApp(JSON.parse(ACCESS_CREDENTIALS.FIREBASE_OPTIONS)),
        AngularFireStorageModule
    ]
})
export class PagePlacesModule { }
