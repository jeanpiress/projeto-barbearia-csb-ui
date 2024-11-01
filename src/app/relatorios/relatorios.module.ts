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



@NgModule({
  declarations: [
    ComissoesGeraisComponent,
    ClientesRetornoComponent
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
    RouterModule
  ],
  exports: [
    ComissoesGeraisComponent
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class RelatoriosModule { }
