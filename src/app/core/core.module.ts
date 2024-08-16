import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { NavBarComponent } from './nav-bar/nav-bar.component';

import { RelatorioService } from '../relatorios/relatorio.service';
import { ClienteService } from '../clientes/cliente.service';
import { ErrorHandlerService } from './error-handler.service';
import { NotificationService } from './notification.service';

import localePt from '@angular/common/locales/pt';
import { FormatoDataService } from './formato-data.service';
import { FinanceiroService } from '../financeiros/financeiro.service';



registerLocaleData(localePt);


@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    ClienteService,
    MessageService,
    ConfirmationService,
    provideHttpClient(withInterceptorsFromDi()),
    ErrorHandlerService,
    NotificationService,
    RelatorioService,
    FormatoDataService,
    FinanceiroService
  ],
  exports: [
    NavBarComponent,
    ToastModule,
    ConfirmDialogModule]
})
export class CoreModule { }
