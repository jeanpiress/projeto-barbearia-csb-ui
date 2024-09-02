import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { PedidoService } from '../pedido.service';
import { Cliente } from '../../core/model';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrl: './atendimento.component.css'
})
export class AtendimentoComponent implements OnInit{

  emEspera = []
  emAtendimento = []
  selectedPedido: any = null;
  displayEmEspera: boolean = false;

  constructor(
    private pedidoService: PedidoService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit(){
    this.pesquisarPedidosAgurdando();
    this.pesquisarPedidosEmAtendimento();
  }

  pesquisarPedidosAgurdando(){
    this.pedidoService.pesquisarPedidosAguardando().subscribe(clientes => this.emEspera = clientes);
  }

  pesquisarPedidosEmAtendimento(){
    this.pedidoService.pesquisarPedidosEmAtendimento().subscribe(emAtendimento => this.emAtendimento = emAtendimento);
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
    this.pedidoService.cancelarPedido(pedido.id).subscribe({
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
    this.pedidoService.alterarPedidoParaEmAtendimento(pedido.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pedido cancelado com sucesso!');
        this.ngOnInit();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }
    });;
  }

  adicionarEmEspera(pedido: any) {
    this.displayEmEspera = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.selectedPedido = pedido;
      this.displayEmEspera  = true;
    }, 0);
  }

}
