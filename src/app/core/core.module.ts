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
import { FinanceiroService } from '../financeiros/financeiro.service';
import { ProfissionalService } from '../profissionais/profissional.service';
import { AuthService } from '../seguranca/auth.service';
import { ItemService } from '../itens/item.service';

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
    TreeModule,
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
    provideHttpClient(withInterceptorsFromDi()),
    ClienteService,
    MessageService,
    ConfirmationService,
    ErrorHandlerService,
    NotificationService,
    RelatorioService,
    FinanceiroService,
    ProfissionalService,
    AuthService,
    ItemService
  ],
  exports: [
    NavBarComponent,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class CoreModule { }
