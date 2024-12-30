import { Component, OnInit, ViewChild } from '@angular/core';
import { Pedido, StatusPedido } from '../../core/model';
import { PedidoService } from '../pedido.service';
import { NotificationService } from '../../core/notification.service';
import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { InserirAgendamentoModalComponent } from '../inserir-agendamento-modal/inserir-agendamento-modal.component';


@Component({
  selector: 'app-agendamento-novo',
  templateUrl: './agendamento-novo.component.html',
  styleUrl: './agendamento-novo.component.css'
})
export class AgendamentoNovoComponent implements OnInit{
  constructor(
    private pedidoService: PedidoService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.pesquisarPedidos();
  }

  @ViewChild(InserirAgendamentoModalComponent)
  inserirAgendamentoModal!: InserirAgendamentoModalComponent;

  agendamentos: Pedido[] = [];
  data: Date = new Date();
  dataSelecionada: string = this.dataISO;
  displayNovoAgendamento: boolean = false;
  displayEditarAgendamento: boolean = false;
  displayDetalhes: boolean = false;
  selectedAgendamento: any = null;

  pesquisarPedidos() {
    this.pedidoService.pesquisarPedidoPorDataExcetoStatus(this.dataSelecionada, StatusPedido.CANCELADO).subscribe({
      next: (pedidos) => {
        this.agendamentos = pedidos.sort((a: { horario: string | number | Date; }, b: { horario: string | number | Date; }) => {
          const horarioA = new Date(a.horario).getTime();
          const horarioB = new Date(b.horario).getTime();
          return horarioA - horarioB;
        });
      },
      error: (err) => {
        console.error('Erro ao buscar pedidos:', err);
      }
    });
  }


  get dataISO(): string {
    return this.data.toISOString().substring(0, 10);
  }

  set dataISO(value: string) {
    const [year, month, day] = value.split('-').map(Number);
    this.data = new Date(year, month - 1, day);
  }

  get dataFormatadaBr(): string {
    const opcoes: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };

    const dataFormatada = this.data.toLocaleDateString('pt-BR', opcoes);
    const [data, diaDaSemana] = dataFormatada.split(', ');
    return `${diaDaSemana.charAt(0).toUpperCase() + diaDaSemana.slice(1)} (${data})`;
  }

  confirmarPedidoParaAtendimento(pedido: Pedido) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja enviar esse cliente para Em Atendimento?',
      accept: () => {
        this.alterarPedidoParaAguardando(pedido);
      }
    });
  }

  alterarPedidoParaAguardando(pedido: Pedido): void {
    this.pedidoService.alterarStatusPedido(pedido.id, StatusPedido.AGUARDANDO).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pedido alterado para Em Atendimento!');
        this.pesquisarPedidos();
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
  }

  atualizarData() {
    this.dataISO = this.dataSelecionada;
    this.pesquisarPedidos();
  }

  voltarDataAtual(){
    this.data = new Date();
    this.dataSelecionada = this.dataISO;
    this.pesquisarPedidos();
  }

  proximoDia(){
    this.data.setDate(this.data.getDate() + 1);
    this.dataSelecionada = this.dataISO;
    this.pesquisarPedidos();
  }

  diaAnterior(){
    this.data.setDate(this.data.getDate() - 1);
    this.dataSelecionada = this.dataISO;
    this.pesquisarPedidos();
  }

  adicionarNovoAgendamento() {
    this.displayNovoAgendamento = false;
    this.notificationService.hideNavBar(true);
    this.inserirAgendamentoModal.limparCampos();
    setTimeout(() => {
      this.displayNovoAgendamento = true;
    }, 0);
  }

  editarAgendamento(agendamento: any) {
    this.displayEditarAgendamento = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.displayEditarAgendamento = true;
      this.selectedAgendamento = agendamento;
    }, 0);
  }

  datalhesAgendamento(agendamento: any) {
    this.displayDetalhes = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.displayDetalhes = true;
      this.selectedAgendamento = agendamento;
    }, 0);
  }

  confirmarCancelamentoAgendamento(pedidoId: number) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja cancelar esse agendamento?',
      accept: () => {
        this.cancelarAgendamento(pedidoId);
      }
    });
  }

  cancelarAgendamento(pedidoId: number){
    this.pedidoService.cancelarPedido(pedidoId).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Agendamento cancelado com sucesso!');
        this.pesquisarPedidos();
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
  }

}
