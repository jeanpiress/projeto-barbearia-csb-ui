import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PedidoSimplificado, Profissional, RelatorioComissaoDetalhada } from '../../core/model';
import { RelatorioService } from '../relatorio.service';
import { PedidoService } from '../../pedidos/pedido.service';
import { ProfissionalService } from '../../profissionais/profissional.service';

@Component({
  selector: 'app-comissao-detalhada',
  templateUrl: './comissao-detalhada.component.html',
  styleUrl: './comissao-detalhada.component.css'
})
export class ComissaoDetalhadaComponent implements OnInit {

  comissao = new RelatorioComissaoDetalhada();
  pedidos: PedidoSimplificado[] = [];
  dataInicio: string;
  dataFim: string;
  profissionais: any[] = [];
  profissionalSelecionado: any;

  constructor(
      private relatorioService: RelatorioService,
      private errorHandler: ErrorHandlerService,
      private profissionalService: ProfissionalService,
    ) {const today = new Date(); this.dataInicio = this.formatDate(today); this.dataFim = this.formatDate(today);}


  ngOnInit(): void {
    this.carregarProfissionais();
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

    buscarComissoesDetalhadas() {
        this.relatorioService.pesquisarComissoesProfissional(this.dataInicio, this.dataFim, this.profissionalSelecionado.value).subscribe({
          next: (resposta) => {
          this.comissao = resposta;
          this.pedidos = this.comissao.pedidos;
        },
        error: (erro) => {
          this.errorHandler.handle(erro)

        }
      });
    }

    formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`; }
}
