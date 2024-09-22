import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AdmComponent } from './views/adm/adm.component';
import { CadastroJogosComponent } from './components/cadastro-jogos/cadastro-jogos.component';
import { ConsultaAtualizaJogosComponent } from './components/consulta-atualiza-jogos/consulta-atualiza-jogos.component';
import { ExcluirJogosComponent } from './components/excluir-jogos/excluir-jogos.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AdmComponent,
    CadastroJogosComponent,
    ConsultaAtualizaJogosComponent,
    ExcluirJogosComponent,
    LoaderComponent
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
