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
