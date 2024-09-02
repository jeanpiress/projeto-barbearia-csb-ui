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




@NgModule({
  declarations: [
    AtendimentoComponent,
    EmEsperaModalComponent
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
    DropdownModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  exports: [
    AtendimentoComponent,
    EmEsperaModalComponent
  ]
})
export class PedidosModule { }
