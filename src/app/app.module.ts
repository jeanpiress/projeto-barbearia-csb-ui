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

import { ClientesModule } from './clientes/clientes.module';



import { CoreModule } from './core/core.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { FinanceirosModule } from './financeiros/financeiros.module';
import { RouterModule, Routes } from '@angular/router';
import { BuscaClientesComponent } from './clientes/busca-clientes/busca-clientes.component';
import { NovoClienteComponent } from './clientes/novo-cliente/novo-cliente.component';
import { CaixaComponent } from './financeiros/caixa/caixa.component';
import { ComissoesGeraisComponent } from './relatorios/comissoes-gerais/comissoes-gerais.component';
import { AtendimentoComponent } from './pedidos/atendimento/atendimento.component';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProfissionaisModule } from './profissionais/profissionais.module';
import { BuscaProfissionaisComponent } from './profissionais/busca-profissionais/busca-profissionais.component';
import { NovoProfissionalComponent } from './profissionais/novo-profissional/novo-profissional.component';

const routes: Routes =[
  {path: 'clientes/buscar', component: BuscaClientesComponent},
  {path: 'clientes/novo', component: NovoClienteComponent},
  {path: 'caixa', component: CaixaComponent},
  {path: 'atendimento', component: AtendimentoComponent},
  {path: 'relatorios/comissoes/gerais', component: ComissoesGeraisComponent},
  {path: 'profissionais/buscar', component: BuscaProfissionaisComponent},
  {path: 'profissionais/novo', component: NovoProfissionalComponent}


]


@NgModule({
  declarations: [
    AppComponent
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
    RelatoriosModule,
    FinanceirosModule,
    PedidosModule,
    ProfissionaisModule,
    RouterModule.forRoot(routes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
