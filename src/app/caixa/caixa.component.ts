import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrl: './caixa.component.css',
  providers: [CurrencyPipe]
})
export class CaixaComponent {

  atendidos = [
    {nome: 'Fulando', inicioAtendimento: new Date(2024, 8, 7, 15, 30), profissional: 'Jose Victor', formaPagamento: 'Dinheiro', valor: 50.00},
    {nome: 'Ciclano', inicioAtendimento: new Date(2024, 8, 7, 16, 42), profissional: 'Matheus', formaPagamento: 'pix', valor: 150.00},
    {nome: 'Beltrano', inicioAtendimento: new Date(2024, 8, 7, 17, 9), profissional: 'Marcos', formaPagamento: 'Debito', valor: 45.00},
    {nome: 'Deltrano', inicioAtendimento: new Date(2024, 8, 7, 17, 12), profissional: 'Bruno', formaPagamento: 'Credito', valor: 45.00}

  ]

  resultados = {
    clienteAtendidos: 5,
    totalDinheiro: 45.00,
    totalPix: 90.00,
    totalCredito: 170.00,
    totalDebito: 120.00,
    fundoCaixa: 50.00,
    total: 425.00
  };

  pieChartData: any;
  options: any;

  constructor(private currencyPipe: CurrencyPipe) {}

  ngOnInit() {
    this.configurarGrafico();
    this.options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    };

  }

  configurarGrafico() {
    this.pieChartData = {
      labels: ['Dinheiro', 'Pix', 'Crédito', 'Débito'],
      datasets: [
        {
          data: [
            this.resultados.totalDinheiro,
            this.resultados.totalPix,
            this.resultados.totalCredito,
            this.resultados.totalDebito
          ],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA']
        }
      ]
    };
  }

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2')?.replace('.', ',') || '';
  }
}
