import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms"
import { IonicModule } from '@ionic/angular';

import { RecuperarClavePageRoutingModule } from './recuperar-clave-routing.module';

import { RecuperarClavePage } from './recuperar-clave.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarClavePageRoutingModule
  ],
  declarations: [RecuperarClavePage]
})
export class RecuperarClavePageModule {}
