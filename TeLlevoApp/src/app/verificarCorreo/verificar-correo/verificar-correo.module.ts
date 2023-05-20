import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificarCorreoPageRoutingModule } from './verificar-correo-routing.module';

import { VerificarCorreoPage } from './verificar-correo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificarCorreoPageRoutingModule
  ],
  declarations: [VerificarCorreoPage]
})
export class VerificarCorreoPageModule {}
