import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormaPagamento, Pedido } from '../../core/model';
import { PedidoService } from '../pedido.service';
import { NotificationService } from '../../core/notification.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-pagamento-modal',
  templateUrl: './pagamento-modal.component.html',
  styleUrl: './pagamento-modal.component.css'
})
export class PagamentoModalComponent implements OnInit{
  @Input() display: boolean = false;
  @Input() pedido: any = new Pedido();
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() pedidoPago = new EventEmitter<void>();

  formasPagamento: any[] = [];

  formaPagamentoSelecionada: any;
  formaPagamentoOptions: { label: string, value: string }[] = [];
  isLoading: boolean = false;

  constructor(private pedidoService: PedidoService,
              private notificationService: NotificationService,
              private errorHandler: ErrorHandlerService) {}

  ngOnInit(): void {
    this.formaPagamentoOptions = Object.keys(FormaPagamento).map(key => ({
      label: FormaPagamento[key as keyof typeof FormaPagamento],
      value: key
    }));
  }

  realizarPagamento(): void {
    this.isLoading = true;
      const formaPagamentoBody = {
        "formaPagamento": this.formaPagamentoSelecionada
      };
    this.pedidoService.pagarPedido(this.pedido.id, formaPagamentoBody)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: () => {
      this.notificationService.showSuccess('Sucesso', 'Pedido pago com sucesso!');
      this.pedidoPago.emit();
      this.fechar();
      },
      error: erro => {
      this.errorHandler.handle(erro);
    }
    });
  }

  fechar() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
