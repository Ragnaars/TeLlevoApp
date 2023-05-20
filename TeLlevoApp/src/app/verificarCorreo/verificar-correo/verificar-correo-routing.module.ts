import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificarCorreoPage } from './verificar-correo.page';

const routes: Routes = [
  {
    path: '',
    component: VerificarCorreoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificarCorreoPageRoutingModule {}
