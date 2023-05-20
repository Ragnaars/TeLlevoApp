import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import {AngularFireModule} from "@angular/fire/compat";
import { provideFirestore,getFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [AppComponent],
  imports: [AngularFireModule.initializeApp(environment.firebaseConfig)
    ,BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,ReactiveFormsModule,FormsModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Geolocation],
  bootstrap: [AppComponent],
})
export class AppModule {}
