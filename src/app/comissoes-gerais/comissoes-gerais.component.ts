import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-comissoes-gerais',
  templateUrl: './comissoes-gerais.component.html',
  styleUrl: './comissoes-gerais.component.css',

})
export class ComissoesGeraisComponent {

  comissoes = [
    {profissional:"Jose Victor", clientesAtendidos: 10, tkm: 45.00, comissao: 225.00},
    {profissional:"Marcos", clientesAtendidos: 7, tkm: 62.00, comissao: 217.00},
    {profissional:"Bruno", clientesAtendidos: 6, tkm: 55.00, comissao: 165.00},
    {profissional:"Matheus", clientesAtendidos: 6, tkm: 47.00, comissao: 141.00}
  ]

  constructor(private currencyPipe: CurrencyPipe) {}

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2')?.replace('.', ',') || '';
  }

}
