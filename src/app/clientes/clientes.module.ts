import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscaClientesComponent } from './busca-clientes/busca-clientes.component';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


@NgModule({
  declarations: [
    BuscaClientesComponent,
    NovoClienteComponent],
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
    ToastModule,
    ChartModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  exports:[
    BuscaClientesComponent,
    NovoClienteComponent
  ]
})
export class ClientesModule { }
