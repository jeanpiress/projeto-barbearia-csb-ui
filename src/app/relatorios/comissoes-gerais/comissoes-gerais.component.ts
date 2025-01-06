import { Component, OnInit } from '@angular/core';
import { RelatorioService } from '../relatorio.service';
import { ErrorHandlerService } from '../../core/error-handler.service';


@Component({
  selector: 'app-comissoes-gerais',
  templateUrl: './comissoes-gerais.component.html',
  styleUrl: './comissoes-gerais.component.css',

})
export class ComissoesGeraisComponent implements OnInit{

  comissoes: any[] = [];
  dataInicio: any = null;
  dataFim: any = null;

  constructor(
    private relatorioService: RelatorioService,
    private errorHandler: ErrorHandlerService
  ) {const today = new Date(); this.dataInicio = this.formatDate(today); this.dataFim = this.formatDate(today);}


  ngOnInit() {
    console.log('incio: ' + this.dataInicio + ' Fim: ' + this.dataFim)
    this.buscarComissoes();
  }

  buscarComissoes() {
      this.relatorioService.pesquisarComissoesData(this.dataInicio, this.dataFim).subscribe({
        next: (resposta) => {
        this.comissoes = resposta;
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
