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
    this.dataInicio = this.formatoData.formatDate(new Date());
    this.dataFim = this.formatoData.formatDate(new Date());

    this.buscarComissoes();
  }

  buscarComissoes() {
    if (this.dataInicio && this.dataFim) {
      const inicioFormatado = this.formatoData.formatDateWithTime(this.dataInicio, '00:00:00');
      const fimFormatado = this.formatoData.formatDateWithTime(this.dataFim, '23:59:59');

      this.relatorioService.pesquisarComissoesData(inicioFormatado, fimFormatado).subscribe({
        next: (resposta) => {
          this.comissoes = resposta;
        },
        error: (erro) => {
          this.errorHandler.handle(erro)

        }
      });
    } else {
      console.error('Datas de início e fim são obrigatórias');
    }
  }

  formatDate(data: Date){
    this.formatoData.formatDate(data);
  }

}
