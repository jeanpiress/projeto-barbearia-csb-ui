import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  clientes = [
    {nome: 'Jean Pires', telefone: '34999708382', ultimaVizita: '07/08/2024', ultimoProfissional: 'Jose Victor'},
    {nome: 'Ronaldo Pires', telefone: '34992768382', ultimaVizita: '01/07/2024', ultimoProfissional: 'Jose Victor'},
    {nome: 'Joao', telefone: '34988363487', ultimaVizita: '02/08/2024', ultimoProfissional: 'Bruno'}
  ]
}
