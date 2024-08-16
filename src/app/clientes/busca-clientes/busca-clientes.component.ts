import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../core/notification.service';
import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';



@Component({
  selector: 'app-busca-clientes',
  templateUrl: './busca-clientes.component.html',
  styleUrl: './busca-clientes.component.css'
})
export class BuscaClientesComponent implements OnInit{

  nomeBusca: string = '';
  clientes = []

  constructor(
    private clienteService: ClienteService,
    private notificationService: NotificationService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ){}

  ngOnInit() {
  }

  pesquisar(){
    this.clienteService.pesquisar(this.nomeBusca).subscribe(clientes => this.clientes = clientes);
  }

  confirmarExclusao(cliente: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir este cliente?',
      accept: () => {
        this.excluir(cliente);
      }
    })
  }

  excluir(cliente: any){
    this.clienteService.excluir(cliente.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Cliente excluído com sucesso!');
        this.pesquisar();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }
    });;
  }
}
