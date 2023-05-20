import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderComponent } from './components/slider/slider.component';
import { QrComponent } from './components/qr/qr.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PrincipalComponent } from './components/principal/principal.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {PlatformModule} from '@angular/cdk/platform';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    QrComponent,
    PrincipalComponent,
    NavBarComponent
  ],
  imports: [
    PlatformModule,
    QRCodeModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
