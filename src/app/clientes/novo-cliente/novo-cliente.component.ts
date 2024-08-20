import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { ClienteService } from '../cliente.service';
import { Cliente, Endereco } from '../../core/model';
import { FormatoDataService } from '../../core/formato-data.service';


@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrl: './novo-cliente.component.css'
})
export class NovoClienteComponent implements OnInit{

  cliente = new Cliente();
  constructor(
    private clienteService: ClienteService,
    private notificationService: NotificationService,
    private formatoData: FormatoDataService,
    private errorHandler: ErrorHandlerService
  ){}

  ngOnInit( ) {
  }

  salvar(){
    const dataNascimento = new Date(this.formatoData.formatDateWithTime(this.cliente.dataNascimento.toString(), '00:00:00'));
    this.cliente.dataNascimento = dataNascimento;
    this.clienteService.novoCliente(this.cliente).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Cliente criado com sucesso!');
        this.resetForm();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }
    });
  }

  resetForm() {
    this.cliente = new Cliente();
  }

}
