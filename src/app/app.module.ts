import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdministradorService } from './services/AdministradorService';
import { AplicacionService } from './services/AplicacionService';
import { AreaLaboral } from './models/AreaLaboral';
import { AreaLaboralService } from './services/AreaLaboralService';
import { CandidatoService } from './services/CandidatoService';
import { CompetenciaService } from './services/CompetenciaService';
import { CompetenciaCandidatoService } from './services/CompetenciaCandidatoService';
import { CompetenciaVacanteService } from './services/CompetenciaVacanteService';
import { ContratanteService } from './services/ContratanteService';
import { UsuarioService } from './services/UsuarioService';
import { VacanteService } from './services/VacanteService';
import { RestService } from './services/abs/rest.service';
import { HttpClientModule } from '@angular/common/http';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatDialogModule,
  MatTableModule,
  MatGridListModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTabsModule,
  MatMenuModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatRadioModule
]

const services = [
  RestService,
  AdministradorService,
  AplicacionService,
  AreaLaboralService,
  CandidatoService,
  CompetenciaService,
  CompetenciaCandidatoService,
  CompetenciaVacanteService,
  ContratanteService,
  UsuarioService,
  VacanteService
]

@NgModule({
  declarations: [
    AppComponent,
    RegistrarseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    materialModules,
    HttpClientModule
  ],
  providers: [services],
  bootstrap: [AppComponent]
})
export class AppModule { }
