import { Component } from '@angular/core';

@Component({
  selector: 'app-busca-clientes',
  templateUrl: './busca-clientes.component.html',
  styleUrl: './busca-clientes.component.css'
})
export class BuscaClientesComponent {
  clientes = [
    {nome: 'Jean Pires', telefone: '34999708382', ultimaVizita: new Date(2024, 8, 7), ultimoProfissional: 'Jose Victor'},
    {nome: 'Ronaldo Pires', telefone: '34992768382', ultimaVizita: new Date(2024, 7, 1), ultimoProfissional: 'Jose Victor'},
    {nome: 'Joao', telefone: '34988363487', ultimaVizita: new Date(2024, 8, 2), ultimoProfissional: 'Bruno'}
  ]
}
