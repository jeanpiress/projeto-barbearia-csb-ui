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
import { CaixaComponent } from './financeiros/caixa/caixa.component';
import { ComissoesGeraisComponent } from './relatorios/comissoes-gerais/comissoes-gerais.component';
import { AtendimentoComponent } from './pedidos/atendimento/atendimento.component';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProfissionaisModule } from './profissionais/profissionais.module';
import { BuscaProfissionaisComponent } from './profissionais/busca-profissionais/busca-profissionais.component';
import { SegurancaModule } from './seguranca/seguranca.module';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { ItensModule } from './itens/itens.module';
import { ClientesRetornoComponent } from './relatorios/clientes-retorno/clientes-retorno.component';
import { ProdutosBuscarComponent } from './itens/produtos-buscar/produtos-buscar.component';
import { AgendamentoNovoComponent } from './pedidos/agendamento-novo/agendamento-novo.component';

const routes: Routes =[
  {path: 'clientes/buscar', component: BuscaClientesComponent},
  {path: 'relatorios/clientes-retorno', component: ClientesRetornoComponent},
  {path: 'caixa', component: CaixaComponent},
  {path: 'atendimento', component: AtendimentoComponent},
  {path: 'agendamento', component: AgendamentoNovoComponent},
  {path: 'relatorios/comissoes/gerais', component: ComissoesGeraisComponent},
  {path: 'profissionais/buscar', component: BuscaProfissionaisComponent},
  {path: 'produtos/buscar', component: ProdutosBuscarComponent},
  {path: 'login', component: LoginFormComponent}



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
    RouterModule.forRoot(routes),
    SegurancaModule,
    ItensModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
