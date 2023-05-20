import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children : [
      {
        path: 'perfil',
        loadChildren : () => import('../perfil/perfil.module').then(x => x.PerfilPageModule)
      },
      {
        path: 'listar',
        loadChildren : () => import('../listar/listar/listar.module').then(x => x.ListarPageModule)
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
