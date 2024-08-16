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
import { ChartModule } from 'primeng/chart';

import { AtendimentoComponent } from './atendimento/atendimento.component';
import { CaixaComponent } from './caixa/caixa.component';
import { ClientesModule } from './clientes/clientes.module';



import { CoreModule } from './core/core.module';
import { RelatoriosModule } from './relatorios/relatorios.module';




@NgModule({
  declarations: [
    AppComponent,
    AtendimentoComponent,
    CaixaComponent
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
    ChartModule,
    ClientesModule,
    CoreModule,
    RelatoriosModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
