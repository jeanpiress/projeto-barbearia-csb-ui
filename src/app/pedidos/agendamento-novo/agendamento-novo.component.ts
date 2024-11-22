import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../core/model';
import { PedidoService } from '../pedido.service';


@Component({
  selector: 'app-agendamento-novo',
  templateUrl: './agendamento-novo.component.html',
  styleUrl: './agendamento-novo.component.css'
})
export class AgendamentoNovoComponent implements OnInit{
  constructor(
    private pedidoService: PedidoService,
  ) {}

  ngOnInit(): void {
    this.pesquisarPedidos();
  }

  agendamentos: Pedido[] = [];
  data: Date = new Date();
  dataSelecionada: string = this.dataISO;

  pesquisarPedidos() {
    this.pedidoService.pesquisarPedidoPorData(this.dataSelecionada).subscribe({
      next: (pedidos) => {
        this.agendamentos = pedidos;
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

}
