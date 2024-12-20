import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { PedidoService } from '../pedido.service';
import { Pedido, StatusPagamento, StatusPedido } from '../../core/model';
import { tap } from 'rxjs';


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
  isEmEspera: boolean = true;
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
    this.atualizarTodosPedidos();
  }



  pesquisarPedidosStatusPedido(statusPedido: StatusPedido) {
     this.pedidoService.pesquisarPedidosPorStatus(statusPedido, StatusPagamento.AGUARDANDO_PAGAMENTO).subscribe(
      statusPedido ===  StatusPedido.AGUARDANDO
      ? pedido => this.emEspera = pedido
      : pedido => this.emAtendimento = pedido);
  }

  atualizarTodosPedidos(): void {
    this.emEspera = [];
    this.emAtendimento = [];
    this.pedidoService.pesquisarPedidosPorStatus(null, StatusPagamento.AGUARDANDO_PAGAMENTO)
        .pipe(
            tap((pedidos: any[]) => {
                if (Array.isArray(pedidos)) {
                    pedidos.forEach((pedido: any) => {
                        if (pedido.statusPedido === 'AGUARDANDO') {
                            this.emEspera.push(pedido);
                        }
                        if(pedido.statusPedido === 'EMATENDIMENTO') {
                            this.emAtendimento.push(pedido);
                        }
                    });
                } else {
                    console.error('A resposta não é um array de pedidos.');
                }
            })
        )
        .subscribe({
            next: () => {},
            error: (erro) => {
                console.error('Erro ao atualizar pedidos:', erro);
            },
        });
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
        this.atualizarTodosPedidos();
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

  alterarPedidoParaEmAtendimento(pedido: Pedido): void {
    this.pedidoService.alterarPedidoParaEmAtendimento(pedido.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pedido alterado para Em Atendimento!');
        this.atualizarTodosPedidos();
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
  }

  adicionarEmEspera(isEmEspera: boolean) {
    this.displayEmEspera = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.isEmEspera = isEmEspera;
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
    setTimeout(() => {
      this.selectedPedido = pedido;
      this.displayCarrinho = true;
    }, 0);
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
