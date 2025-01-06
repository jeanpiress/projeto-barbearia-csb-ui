import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ComissoesGeraisComponent } from './comissoes-gerais/comissoes-gerais.component';
import { RouterModule } from '@angular/router';
import { ClientesRetornoComponent } from './clientes-retorno/clientes-retorno.component';
import { ComissaoDetalhadaComponent } from './comissao-detalhada/comissao-detalhada.component';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FaturamentoPeriodoComponent } from './faturamento-periodo/faturamento-periodo.component';
import { SharedModule } from '../shared/shared/shared.module';



@NgModule({
  declarations: [
    ComissoesGeraisComponent,
    ClientesRetornoComponent,
    ComissaoDetalhadaComponent,
    FaturamentoPeriodoComponent
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
    DropdownModule,
    CardModule,
    SharedModule
  ],
  exports: [
    ComissoesGeraisComponent,
    ClientesRetornoComponent,
    ComissaoDetalhadaComponent,
    FaturamentoPeriodoComponent
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class RelatoriosModule { }
