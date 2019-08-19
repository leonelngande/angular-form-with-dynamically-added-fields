import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormCreateContactComponent } from './components/create-contact-form/form-create-contact.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  IgxAvatarModule,
  IgxButtonModule,
  IgxCardModule,
  IgxComboModule, IgxDatePickerModule,
  IgxDropDownModule,
  IgxIconModule,
  IgxInputGroupModule, IgxRippleModule, IgxSelectModule
} from 'igniteui-angular';
import {GooglePlacesDirective} from './directives/google-places.directive';
import {AgmCoreModule} from '@agm/core';
import {NgxJsonViewerModule} from 'ngx-json-viewer';

const IGX_MODULES = [
  IgxAvatarModule,
  IgxIconModule,
  IgxCardModule,
  IgxInputGroupModule,
  IgxComboModule,
  IgxButtonModule,
  IgxDropDownModule,
  IgxSelectModule,
  IgxRippleModule,
  IgxDatePickerModule,
];

const DIRECTIVES = [
  GooglePlacesDirective,
];

@NgModule({
  declarations: [
    ...DIRECTIVES,
    AppComponent,
    FormCreateContactComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyApTOC3BKKF_7OfcLssSrCTqOihfzRWfIM',
      libraries: ['places'],
    }),
    NgxJsonViewerModule,
    ...IGX_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
