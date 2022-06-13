import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatoComponent } from './views/candidato/candidato.component';
import { EntradaComponent } from './views/entrada/entrada.component';
import { RegistrarseComponent } from './views/registrarse/registrarse.component';
import { VacantesComponent } from './views/vacantes/vacantes.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: RegistrarseComponent, },
  {
    path: 'entrada', component: EntradaComponent, children: [
      { path: '', redirectTo: '/entrada/candidato', pathMatch: 'full' },
      { path: 'candidato', component: CandidatoComponent, },
      { path: 'vacantes', component: VacantesComponent, },
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
