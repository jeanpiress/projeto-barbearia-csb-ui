import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../core/notification.service';
import { ClienteService } from './../cliente.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-busca-clientes',
  templateUrl: './busca-clientes.component.html',
  styleUrls: ['./busca-clientes.component.css']
})
export class BuscaClientesComponent implements OnInit {

  nomeBusca: string = '';
  clientes = [];
  selectedCliente: any = null;
  displayDetalhes: boolean = false;
  displayEditar: boolean = false;
  displayNovoCliente: boolean = false;


  constructor(
    private clienteService: ClienteService,
    private notificationService: NotificationService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {}

  pesquisar() {
    this.clienteService.pesquisar(this.nomeBusca).subscribe(clientes => this.clientes = clientes);
  }

  confirmarExclusao(cliente: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir este cliente?',
      accept: () => {
        this.excluir(cliente);
      }
    });
  }

  excluir(cliente: any) {
    this.clienteService.excluir(cliente.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Cliente excluído com sucesso!');
        this.pesquisar();
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
  }

  mostrarDetalhes(cliente: any) {
    this.displayDetalhes = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.selectedCliente = cliente;
      this.displayDetalhes  = true;
    }, 0);
  }

  editarCliente(cliente: any) {
    this.displayEditar = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.selectedCliente = cliente;
      this.displayEditar  = true;
    }, 0);
  }

  novoCliente(cliente: any) {
    this.displayNovoCliente = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.selectedCliente = cliente;
      this.displayNovoCliente  = true;
    }, 0);
  }

}
