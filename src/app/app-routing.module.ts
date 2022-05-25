import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarseComponent } from './registrarse/registrarse.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: 'inicio', component: PrincipalComponent,  },
  { path: 'login', component: RegistrarseComponent, },
  //{ path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
