import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { map } from 'rxjs';
import { ClienteService } from '../../clientes/cliente.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Cliente, Pedido, Profissional, StatusPedido } from '../../core/model';
import { NotificationService } from '../../core/notification.service';
import { ProfissionalService } from '../../profissionais/profissional.service';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-inserir-agendamento-modal',
  templateUrl: './inserir-agendamento-modal.component.html',
  styleUrl: './inserir-agendamento-modal.component.css'
})
export class InserirAgendamentoModalComponent {
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() pedidoSalvo = new EventEmitter<void>();

  nomeClienteBusca: string = '';
  clientes: any[] = [];
  clienteSelecionado: any;
  profissionais: any[] = [];
  profissionalSelecionado: any;
  dataHora = new Date();
  dataHoraFinal = new Date();
  dia = new Date();
  descricao: string = '';
  tempoSelecionado: string = '';
  opcoesTempo: any[] = [
    { label: '00:15', value: '00:15' }, { label: '00:30', value: '00:30' }, { label: '00:45', value: '00:45' },
    { label: '01:00', value: '01:00' }, { label: '01:15', value: '01:15' }, { label: '01:30', value: '01:30' },
    { label: '01:45', value: '01:45' }, { label: '02:00', value: '02:00' }, { label: '02:15', value: '02:15' },
    { label: '02:30', value: '02:30' }, { label: '02:45', value: '02:45' }, { label: '03:00', value: '03:00' },
    { label: '03:15', value: '03:15' }, { label: '03:30', value: '03:30' }, { label: '03:45', value: '03:45' },
    { label: '04:00', value: '04:00' }, { label: '04:15', value: '04:15' }, { label: '04:30', value: '04:30' },
    { label: '04:45', value: '04:45' }, { label: '05:00', value: '05:00' }, { label: '05:15', value: '05:15' },
    { label: '05:30', value: '05:30' }, { label: '05:45', value: '05:45' }, { label: '06:00', value: '06:00' }
  ];



  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private profissionalService: ProfissionalService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
  ){}

  ngOnInit() {
    this.carregarProfissionais();
    this.inicializarDataHora();
  }

  inicializarDataHora() {
    const agora = new Date();

    const minutos = agora.getMinutes();
    const minutosArredondados = minutos % 30 === 0 ? minutos : Math.ceil(minutos / 30) * 30;

    this.dataHora = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), agora.getHours(), minutosArredondados, 0, 0);
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
      });
  }

  salvarPedido() {
    const dataCompleta = new Date(
      this.dia.getFullYear(),
      this.dia.getMonth(),
      this.dia.getDate(),
      this.dataHora.getHours(),
      this.dataHora.getMinutes(),
      0,
      0
    );

    this.adicionarTempo(dataCompleta, this.tempoSelecionado);

    if (!this.isHorarioValido(dataCompleta)) {
      this.notificationService.showError('Erro', 'Não é permitido data e hora anterior.');
      return;
    }

    const novoPedido = {
      horario: dataCompleta.toISOString(),
      cliente: { id: this.clienteSelecionado },
      profissional: { id: this.profissionalSelecionado.value },
      descricao: this.descricao,
      duracao: this.tempoSelecionado
    };
    this.adicionarTempo(dataCompleta, this.tempoSelecionado);
    this.pedidoService.novoPedido(novoPedido, StatusPedido.AGENDADO).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pedido enviado para a fila com sucesso!');
        console.log('data hora final ' + this.dataHoraFinal);
        this.close();
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
  }


  limparCampos() {
    this.nomeClienteBusca = '';
    this.clienteSelecionado = null;
    this.profissionalSelecionado = null;
    this.dataHora = new Date();
    this.dia = new Date();
    this.dataHoraFinal = new Date();
    this.tempoSelecionado = '';
    this.descricao = '';
    this.inicializarDataHora();
  }

  adicionarTempo(data: Date, tempo: string) {
    const [horas, minutos] = tempo.split(':').map(Number);
    this.dataHoraFinal.setFullYear(data.getFullYear());
    this.dataHoraFinal.setMonth(data.getMonth());
    this.dataHoraFinal.setDate(data.getDate());
    this.dataHoraFinal.setHours(data.getHours() + horas);
    this.dataHoraFinal.setMinutes(data.getMinutes() + minutos);
    this.dataHoraFinal.setSeconds(0);
  }


  isHorarioValido(horario: Date): boolean {
    const agora = new Date();
    console.log('horario ' + horario + ' agora ' + agora );
    console.log(horario > agora);
    return horario > agora;
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
