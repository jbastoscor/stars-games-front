import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { AdmComponent } from './views/adm/adm.component';
import { LoaderComponent } from './components/loader/loader.component';
import { Heading1Component } from './components/heading1/heading1.component';
import { AdmCadastroCategoriesComponent } from './components/adm-cadastro-categories/adm-cadastro-categories.component';
import { AdmCadastroGamesComponent } from './components/adm-cadastro-games/adm-cadastro-games.component';
import { AdmConsultaCategoriesComponent } from './components/adm-consulta-categories/adm-consulta-categories.component';
import { AdmConsultaUpdateGamesComponent } from './components/adm-consulta-update-games/adm-consulta-update-games.component';
import { AdmDeleteCategoriesComponent } from './components/adm-delete-categories/adm-delete-categories.component';
import { AdmDeleteGamesComponent } from './components/adm-delete-games/adm-delete-games.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdmComponent,
    LoaderComponent,
    Heading1Component,
    AdmCadastroCategoriesComponent,
    AdmCadastroGamesComponent,
    AdmConsultaCategoriesComponent,
    AdmConsultaUpdateGamesComponent,
    AdmDeleteCategoriesComponent,
    AdmDeleteGamesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
