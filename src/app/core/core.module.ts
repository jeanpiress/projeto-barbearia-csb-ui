import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';

import localePt from '@angular/common/locales/pt';
import { RouterModule } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';

import { NavBarComponent } from './nav-bar/nav-bar.component';

import { RelatorioService } from '../relatorios/relatorio.service';
import { ClienteService } from '../clientes/cliente.service';
import { ErrorHandlerService } from './error-handler.service';
import { NotificationService } from './notification.service';
import { FormatoDataService } from './formato-data.service';
import { FinanceiroService } from '../financeiros/financeiro.service';
import { ProfissionalService } from '../profissionais/profissional.service';
import { AuthService } from '../seguranca/auth.service';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

registerLocaleData(localePt);

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule,
    TreeModule, // Mover TreeModule para imports
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideHttpClient(withInterceptorsFromDi()), // Usar apenas o provideHttpClient
    ClienteService,
    MessageService,
    ConfirmationService,
    ErrorHandlerService,
    NotificationService,
    RelatorioService,
    FormatoDataService,
    FinanceiroService,
    ProfissionalService,
    AuthService
  ],
  exports: [
    NavBarComponent,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class CoreModule { }
