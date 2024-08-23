import { Component, OnInit } from '@angular/core';
import { RelatorioService } from '../relatorio.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { FormatoDataService } from '../../core/formato-data.service';


@Component({
  selector: 'app-comissoes-gerais',
  templateUrl: './comissoes-gerais.component.html',
  styleUrl: './comissoes-gerais.component.css',

})
export class ComissoesGeraisComponent implements OnInit{

  comissoes: any[] = [];
  dataInicio: string = '';
  dataFim: string = '';

  constructor(
    private relatorioService: RelatorioService,
    private errorHandler: ErrorHandlerService,
    private formatoData: FormatoDataService
  ) {}

  ngOnInit() {
    this.buscarComissoes();
  }

  buscarComissoes() {
    if (this.dataInicio && this.dataFim) {
        this.relatorioService.pesquisarComissoesData(this.dataInicio + 'T00:00:00-03:00', this.dataFim + 'T23:59:59-03:00').subscribe({
          next: (resposta) => {
          this.comissoes = resposta;
        },
        error: (erro) => {
          this.errorHandler.handle(erro)

        }
      });
    } else {
      this.relatorioService.pesquisarComissoesData(new Date().toISOString().substring(0, 10) +
      'T00:00:00-03:00', new Date().toISOString().substring(0, 10) + 'T23:59:59-03:00').subscribe({
        next: (resposta) => {
        this.comissoes = resposta;
      },
      error: (erro) => {
        this.errorHandler.handle(erro)

      }
    });
    }
  }

  formatDate(data: Date){
    this.formatoData.formatDate(data);
  }

}
