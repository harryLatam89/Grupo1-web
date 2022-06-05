import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatoComponent } from './views/candidato/candidato.component';
import { RegistrarseComponent } from './views/registrarse/registrarse.component';
import { VacantesComponent } from './views/vacantes/vacantes.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: 'inicio', component: PrincipalComponent,  },
  { path: 'login', component: RegistrarseComponent, },
  { path: 'candidato', component: CandidatoComponent, },
  { path: 'vacantes', component: VacantesComponent, },
  //{ path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
