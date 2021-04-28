import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../layout';
import { SharedModule } from '../../shared';
import { AppRoutingModule } from '../../../app-routing.module';
import { MaterialModule } from '../../material';
import {
  PageAuthorizationViewComponent,
  RegistrationComponent,
  LoginComponent
} from './components';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [PageAuthorizationViewComponent, RegistrationComponent, LoginComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PageAuthorizationModule { }
