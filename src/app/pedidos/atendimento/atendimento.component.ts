import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { PedidoService } from '../pedido.service';
import { Pedido, StatusPagamento, StatusPedido } from '../../core/model';


@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.css']
})
export class AtendimentoComponent implements OnInit {

  emEspera: Pedido[] = [];
  emAtendimento: Pedido[] = [];
  statusEmAtendimento = StatusPedido.EMATENDIMENTO;
  selectedPedido: Pedido | null = null;
  displayEmEspera: boolean = false;
  displayAlterarProfissional: boolean = false;
  displayCarrinho: boolean = false;
  displayPagamentoModal: boolean = false;

  constructor(
    private pedidoService: PedidoService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    this.atualizarPedidos();
  }



  pesquisarPedidosStatusPedido(statusPedido: StatusPedido) {
     this.pedidoService.pesquisarPedidosPorStatus(statusPedido, StatusPagamento.AGUARDANDO_PAGAMENTO).subscribe(
      statusPedido ===  StatusPedido.AGUARDANDO
      ? pedido => this.emEspera = pedido
      : pedido => this.emAtendimento = pedido);
  }

  atualizarPedidos(){
    this.pesquisarPedidosStatusPedido(StatusPedido.AGUARDANDO);
    this.pesquisarPedidosStatusPedido(StatusPedido.EMATENDIMENTO);
  }

  confirmarCancelamentoPedido(pedido: Pedido) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja cancelar esse atendimento?',
      accept: () => {
        this.cancelarPedido(pedido);
      }
    });
  }

  cancelarPedido(pedido: Pedido) {
    this.pedidoService.cancelarPedido(pedido.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pedido cancelado com sucesso!');
        this.atualizarPedidos();
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
  }

  confirmarPedidoParaAtendimento(pedido: Pedido) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja enviar esse cliente para Em Atendimento?',
      accept: () => {
        this.alterarPedidoParaEmAtendimento(pedido);
      }
    });
  }

  alterarPedidoParaEmAtendimento(pedido: Pedido) {
    this.pedidoService.alterarPedidoParaEmAtendimento(pedido.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pedido alterado para Em Atendimento!');
        this.ngOnInit();
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
  }

  adicionarEmEspera(pedido: any) {
    this.displayEmEspera = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.selectedPedido = pedido;
      this.displayEmEspera = true;
    }, 0);
  }

  alterarProfissional(pedido: Pedido) {
    this.displayAlterarProfissional = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.selectedPedido = pedido;
      this.displayAlterarProfissional = true;
    }, 0);
  }

  abrirCarrinho(pedido: Pedido) {
    this.displayCarrinho = false;
    this.notificationService.hideNavBar(true);

    this.pedidoService.limparPedido(pedido.id).subscribe({
      next: () => {
        console.log('Carrinho limpo');
        this.selectedPedido = pedido;
        this.displayCarrinho = true;
      },
      error: (err) => {
        console.error('Erro ao limpar o carrinho:', err);
      }
    });
  }

  pagamentoModal(pedido: Pedido) {
    this.displayPagamentoModal = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.selectedPedido = pedido;
      this.displayPagamentoModal = true;
    }, 0);
  }

}
