import { Component, OnInit } from '@angular/core';
import { RelatorioService } from '../relatorio.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-clientes-retorno',
  templateUrl: './clientes-retorno.component.html',
  styleUrl: './clientes-retorno.component.css'
})
export class ClientesRetornoComponent implements OnInit{
encodeURIComponent(arg0: string) {
throw new Error('Method not implemented.');
}

  clientes: any[] = [];
  diasBusca: any = null;

  constructor(
    private relatorioService: RelatorioService,
    private errorHandler: ErrorHandlerService) {}

    ngOnInit(): void {
    this.buscarClientesRetorno();
  }

  buscarClientesRetorno(){
    this.relatorioService.pesquisarClientesRetorno(this.diasBusca ?? 300).subscribe({
      next: (resposta) => {
      this.clientes = resposta;
    },
    error: (erro) => {
      this.errorHandler.handle(erro)

    }
  });
  }
}
