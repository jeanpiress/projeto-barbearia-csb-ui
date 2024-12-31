import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ProfissionalService } from '../../profissionais/profissional.service';
import { RelatorioService } from '../relatorio.service';

@Component({
  selector: 'app-faturamento-periodo',
  templateUrl: './faturamento-periodo.component.html',
  styleUrl: './faturamento-periodo.component.css'
})
export class FaturamentoPeriodoComponent implements OnInit{
  faturamento: any;
  dataInicio: string;
  dataFim: string;

  constructor(
        private relatorioService: RelatorioService,
        private errorHandler: ErrorHandlerService,
        private profissionalService: ProfissionalService,
      ) {const today = new Date(); this.dataInicio = this.formatDate(today); this.dataFim = this.formatDate(today);}


  ngOnInit(): void {
    this.buscarFaturamentoPorPeriodo()
  }

  buscarFaturamentoPorPeriodo() {
    this.relatorioService.pesquisarFaturamento(this.dataInicio, this.dataFim).subscribe({
      next: (resposta) => {
      this.faturamento = resposta;
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
