import { StatusPagamento } from './../../core/model';
import { Component } from '@angular/core';
import { FinanceiroService } from '../financeiro.service';
import { NotificationService } from '../../core/notification.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ConfirmationService } from 'primeng/api';
import { PedidoService } from '../../pedidos/pedido.service';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrl: './caixa.component.css'
})
export class CaixaComponent {

  pedidos = [];
  resultados: any;


  constructor(
    private financeiroService: FinanceiroService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private pedidoService: PedidoService,
  ) {}

  ngOnInit() {
    this.pesquisarCaixaAberto();
    this.pesquisarPedidosPagosCaixAberto();
  }

  pesquisarCaixaAberto() {
    this.financeiroService.pesquisarValoresCaixaAberto().subscribe((resposta: any) => {
      this.resultados = resposta;
    });
  }

  pesquisarPedidosPagosCaixAberto(){
    this.pedidoService.pesquisarPedidosPorStatusPagamentoEIsAberto(true, StatusPagamento.PAGO).subscribe(atendidos => this.pedidos = atendidos);
  }

  confirmarFechamentoDeCaixa(){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja fechar o caixa agora?',
      accept: () => {
        this.fecharCaixa();
      }
    })
  }

  confirmarExclusaoPedido(pedido: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir este pedido?',
      accept: () => {
        this.excluirPedido(pedido);
      }
    })
  }

  fecharCaixa(){
    this.financeiroService.fecharCaixa().subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Caixa fechado com sucesso!');
        this.pesquisarCaixaAberto();
        this.pesquisarPedidosPagosCaixAberto();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }
    });;
  }

  excluirPedido(pedido: any){
    this.pedidoService.excluirPedido(pedido.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pedido excluído com sucesso!');
        this.pesquisarCaixaAberto();
      this.pesquisarPedidosPagosCaixAberto();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }
    });;
  }
}
