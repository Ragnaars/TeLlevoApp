import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
  {path: 'principal', component: PrincipalComponent},
  {path : "**" , pathMatch : 'full', redirectTo : 'principal'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
