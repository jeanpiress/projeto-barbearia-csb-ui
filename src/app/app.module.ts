import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast'
import { ChartModule } from 'primeng/chart';




import { BuscaClientesComponent } from './busca-clientes/busca-clientes.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import { CaixaComponent } from './caixa/caixa.component';
import { ComissoesGeraisComponent } from './comissoes-gerais/comissoes-gerais.component';






@NgModule({
  declarations: [
    AppComponent,
    BuscaClientesComponent,
    NavBarComponent,
    NovoClienteComponent,
    AtendimentoComponent,
    CaixaComponent,
    ComissoesGeraisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    InputTextareaModule,
    FormsModule,
    ToastModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
