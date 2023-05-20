import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'listar',
    loadChildren: () => import('./listar/listar/listar.module').then( m => m.ListarPageModule)
  },
  {
    path: 'detalle-viaje/:idCarrera',
    loadChildren: () => import('./detalleViaje/detalle-viaje/detalle-viaje.module').then( m => m.DetalleViajePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'recuperar-clave',
    loadChildren: () => import('./recuperarClave/recuperar-clave/recuperar-clave.module').then( m => m.RecuperarClavePageModule)
  },
  {
    path: 'verificar-correo',
    loadChildren: () => import('./verificarCorreo/verificar-correo/verificar-correo.module').then( m => m.VerificarCorreoPageModule)
  },
  {
    path: 'eliminar/:idCarrera',
    loadChildren: () => import('./eliminar/eliminar/eliminar.module').then( m => m.EliminarPageModule)
  }
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
