import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import { DialogModule } from 'primeng/dialog';
import { EmEsperaModalComponent } from './em-espera-modal/em-espera-modal.component';
import { DropdownModule } from 'primeng/dropdown';
import { AlterarProfissionalModalComponent } from './alterar-profissional-modal/alterar-profissional-modal.component';
import { CoreModule } from '../core/core.module';
import { CarrinhoModalComponent } from './carrinho-modal/carrinho-modal.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { PagamentoModalComponent } from './pagamento-modal/pagamento-modal.component';
import { AgendamentoNovoComponent } from './agendamento-novo/agendamento-novo.component';
import { InserirAgendamentoModalComponent } from './inserir-agendamento-modal/inserir-agendamento-modal.component';
import { CalendarModule } from 'primeng/calendar';
import { EditarAgendamentoModalComponent } from './editar-agendamento-modal/editar-agendamento-modal.component';






@NgModule({
  declarations: [
    AtendimentoComponent,
    EmEsperaModalComponent,
    AlterarProfissionalModalComponent,
    CarrinhoModalComponent,
    PagamentoModalComponent,
    AgendamentoNovoComponent,
    InserirAgendamentoModalComponent,
    EditarAgendamentoModalComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    InputTextareaModule,
    FormsModule,
    ChartModule,
    ConfirmDialogModule,
    RouterModule,
    DialogModule,
    DropdownModule,
    CoreModule,
    DataViewModule,
    TagModule,
    CalendarModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  exports: [
    AtendimentoComponent,
    EmEsperaModalComponent,
    CarrinhoModalComponent,
    PagamentoModalComponent,
    AgendamentoNovoComponent,
    InserirAgendamentoModalComponent,
    EditarAgendamentoModalComponent,
  ]
})
export class PedidosModule { }
