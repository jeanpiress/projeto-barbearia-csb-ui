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
import { TooltipModule } from 'primeng/tooltip';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ClientesDetalhesComponent } from './clientes-detalhes/clientes-detalhes.component';
import { FieldsetModule } from 'primeng/fieldset';
import { GalleriaModule } from 'primeng/galleria';
import { ClientesEditarModalComponent } from './clientes-editar-modal/clientes-editar-modal.component';


@NgModule({
  declarations: [
    BuscaClientesComponent,
    NovoClienteComponent,
    ClientesDetalhesComponent,
    ClientesEditarModalComponent],
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
    FieldsetModule,
    GalleriaModule
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
