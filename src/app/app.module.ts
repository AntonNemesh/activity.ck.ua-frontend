import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { modules } from './modules';
import { services } from './services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModInterceptor } from './interceptors';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...modules,
  ],
  providers: [
    ...services,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderModInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
