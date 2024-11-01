import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormaPagamento, Pedido } from '../../core/model';
import { PedidoService } from '../pedido.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/notification.service';
import { ErrorHandlerService } from '../../core/error-handler.service';


@Component({
  selector: 'app-pagamento-modal',
  templateUrl: './pagamento-modal.component.html',
  styleUrl: './pagamento-modal.component.css'
})
export class PagamentoModalComponent implements OnInit{
  @Input() display: boolean = false;
  @Input() pedido: any = new Pedido();
  @Output() displayChange = new EventEmitter<boolean>();

  formasPagamento: any[] = [];

  formaPagamentoSelecionada: any;
  formaPagamentoOptions: { label: string, value: string }[] = [];

  constructor(private pedidoService: PedidoService,
              private notificationService: NotificationService,
              private errorHandler: ErrorHandlerService,
              private router: Router) {}

  ngOnInit(): void {
    this.formaPagamentoOptions = Object.keys(FormaPagamento).map(key => ({
      label: FormaPagamento[key as keyof typeof FormaPagamento],
      value: key
    }));
  }

  realizarPagamento(): void {
    const formaPagamentoBody = {
      "formaPagamento": this.formaPagamentoSelecionada
    };
    this.pedidoService.pagarPedido(this.pedido.id, formaPagamentoBody)
    .subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pedido pago com sucesso!');
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
  }

  finalizarPagamento() {
    this.realizarPagamento();
    this.fechar();
    this.router.navigate(['/atendimento']);
  }


  fechar() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
