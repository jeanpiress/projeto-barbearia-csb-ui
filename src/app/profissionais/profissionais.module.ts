import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscaProfissionaisComponent } from './busca-profissionais/busca-profissionais.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { GalleriaModule } from 'primeng/galleria';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { NovoProfissionalComponent } from './novo-profissional/novo-profissional.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { SharedModule } from '../shared/shared/shared.module';
import { EditarProfissionalModalComponent } from './editar-profissional-modal/editar-profissional-modal.component';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';





@NgModule({
  declarations: [
    BuscaProfissionaisComponent,
    NovoProfissionalComponent,
    EditarProfissionalModalComponent
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
    FieldsetModule,
    GalleriaModule,
    InputNumberModule,
    SharedModule,
    FileUploadModule,
    PasswordModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  exports:[
    BuscaProfissionaisComponent,
    NovoProfissionalComponent,
    EditarProfissionalModalComponent
  ]
})
export class ProfissionaisModule { }
