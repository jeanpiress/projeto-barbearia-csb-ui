import { AtendimentoComponent } from './../atendimento/atendimento.component';
import { PedidoService } from './../pedido.service';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Cliente, Pedido, Profissional, StatusPedido } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { ClienteService } from '../../clientes/cliente.service';
import { map } from 'rxjs';
import { ProfissionalService } from '../../profissionais/profissional.service';

@Component({
  selector: 'app-em-espera-modal',
  templateUrl: './em-espera-modal.component.html',
  styleUrl: './em-espera-modal.component.css'
})
export class EmEsperaModalComponent {
  @Input() pedido: any = new Pedido();
  @Input() display: boolean = false;
  @Input() isEmEspera: boolean = true;
  @Output() displayChange = new EventEmitter<boolean>();
  nomeClienteBusca: string = '';
  clientes: any[] = [];
  clienteSelecionado: any;
  profissionais: any[] = [];
  profissionalSelecionado: any;


  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private profissionalService: ProfissionalService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private atendimentoComponent: AtendimentoComponent
  ){}
  ngOnInit() {
   }

  onInput(event: any) {
    const input = event.target.value;
    if (input.length >= 4) {
      this.carregarClientes();
    } else {
      this.clientes = [];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isEmEspera']) {
      this.carregarProfissionais();
    }
  }

  carregarClientes() {
    if (this.nomeClienteBusca.length >= 4) {
    this.clienteService.pesquisarClientes(this.nomeClienteBusca, true)
      .pipe(
        map((clientes: Cliente[]) =>
          clientes.map(cliente => ({ label: cliente.nome, value: cliente.id }))
        )
      )
      .subscribe(clientesFormatados => {
        this.clientes = clientesFormatados;

        if (this.clientes.length > 0) {
          this.clienteSelecionado = this.clientes[0].value;
        }
      });
    }
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
        if(this.isEmEspera){
          this.profissionais.unshift({ label: 'Sem Preferencia', value: null });
        }
      });

  }

  salvarPedido() {
   const novoPedido = {
      cliente: { id: this.clienteSelecionado },
      profissional: { id: this.profissionalSelecionado.value }
    };
    const statusPedido = (this.isEmEspera) ? StatusPedido.AGUARDANDO : StatusPedido.EMATENDIMENTO;
    this.pedidoService.novoPedido(novoPedido, statusPedido).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pedido enviado para a fila com sucesso!');
        this.atendimentoComponent.pesquisarPedidosStatusPedido(statusPedido);
        this.close();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }});
  }

  limparFiltros(){
    this.nomeClienteBusca = '',
    this.clienteSelecionado = null;
    this.profissionalSelecionado = null;
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
