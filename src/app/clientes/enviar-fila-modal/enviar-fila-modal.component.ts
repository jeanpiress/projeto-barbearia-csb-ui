import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Cliente, Profissional, StatusPedido } from '../../core/model';
import { NotificationService } from '../../core/notification.service';
import { AtendimentoComponent } from '../../pedidos/atendimento/atendimento.component';
import { PedidoService } from '../../pedidos/pedido.service';
import { ProfissionalService } from '../../profissionais/profissional.service';

@Component({
  selector: 'app-enviar-fila-modal',
  templateUrl: './enviar-fila-modal.component.html',
  styleUrl: './enviar-fila-modal.component.css'
})
export class EnviarFilaModalComponent {
  @Input() cliente: any = new Cliente();
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  nomeClienteBusca: string = '';
  clientes: any[] = [];
  profissionais: any[] = [];
  profissionalSelecionado: any;


  constructor(
    private pedidoService: PedidoService,
    private profissionalService: ProfissionalService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private atendimentoComponent: AtendimentoComponent
  ){}
  ngOnInit() {
    this.carregarProfissionais();
    console.log(this.cliente);
   }

  carregarProfissionais() {
    this.profissionalService.pesquisarProfissionais('ativos')
      .pipe(
        map((profissionais: Profissional[]) =>
          profissionais.map(profissional => ({ label: profissional.nome, value: profissional.id }))
        )
      )
      .subscribe(profissionaisFormatados => {
        this.profissionais = profissionaisFormatados;
        this.profissionais.unshift({label: 'Sem Preferencia', value: null});
      });

  }

    enviarFila() {
    if (!this.profissionalSelecionado) {
      this.notificationService.showError('Erro', 'Profissional não selecionado');
      return;
    }
    console.log(this.profissionalSelecionado.value)

    const novoPedido = {
      cliente: {
        id: this.cliente.id
      },
      profissional:{
        id: this.profissionalSelecionado.value
      }
    }

    this.pedidoService.novoPedido(novoPedido, StatusPedido.AGUARDANDO).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Profissional alterado com sucesso!');
        this.atendimentoComponent.atualizarTodosPedidos();
        this.close();
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
