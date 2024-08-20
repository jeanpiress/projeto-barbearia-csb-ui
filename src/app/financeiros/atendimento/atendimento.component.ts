import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { FinanceiroService } from '../financeiro.service';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrl: './atendimento.component.css'
})
export class AtendimentoComponent implements OnInit{

  clientes = [

  ]
  emAtendimento = [

  ]

  constructor(
    private financeiroService: FinanceiroService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit(){
    this.pesquisarPedidosAgurdando();
    this.pesquisarPedidosEmAtendimento();
  }

  pesquisarPedidosAgurdando(){
    this.financeiroService.pesquisarPedidosAguardando().subscribe(clientes => this.clientes = clientes);
  }

  pesquisarPedidosEmAtendimento(){
    this.financeiroService.pesquisarPedidosEmAtendimento().subscribe(emAtendimento => this.emAtendimento = emAtendimento);
  }

  confirmarCancelamentoPedido(pedido: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja cancelar esse atendimento?',
      accept: () => {
        this.cancelarPedido(pedido);
      }
    })
  }

  cancelarPedido(pedido: any){
    this.financeiroService.cancelarPedido(pedido.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pedido cancelado com sucesso!');
        this.pesquisarPedidosAgurdando();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }
    });;
  }

  confirmarPedidoParaAtendimento(pedido: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja enviar esse cliente para Em Atendimento?',
      accept: () => {
        this.alterarPedidoParaEmAtendimento(pedido);
      }
    })
  }

  alterarPedidoParaEmAtendimento(pedido: any){
    this.financeiroService.alterarPedidoParaEmAtendimento(pedido.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pedido cancelado com sucesso!');
        this.ngOnInit();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }
    });;
  }
}
