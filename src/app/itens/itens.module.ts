import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProdutosCadastroComponent } from './produtos-cadastro/produtos-cadastro.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ProdutosBuscarComponent } from './produtos-buscar/produtos-buscar.component';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ProdutosDetalhesModalComponent } from './produtos-detalhes-modal/produtos-detalhes-modal.component';
import { ProdutosEditarModalComponent } from './produtos-editar-modal/produtos-editar-modal.component';
import { FileUploadModule } from 'primeng/fileupload';



@NgModule({
  declarations: [
    ProdutosCadastroComponent,
    ProdutosBuscarComponent,
    ProdutosDetalhesModalComponent,
    ProdutosEditarModalComponent
  ],
  imports: [
    CommonModule,
    InputSwitchModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    TooltipModule,
    InputMaskModule,
    FormsModule,
    DialogModule,
    TableModule,
    InputNumberModule,
    DropdownModule,
    FileUploadModule
  ]
})
export class ItensModule {}
