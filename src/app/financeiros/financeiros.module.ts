import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaixaComponent } from './caixa/caixa.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';




@NgModule({
  declarations: [
    CaixaComponent

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
    ConfirmDialogModule,
    RouterModule,
    CardModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  exports:[
    CaixaComponent
  ]
})
export class FinanceirosModule { }
