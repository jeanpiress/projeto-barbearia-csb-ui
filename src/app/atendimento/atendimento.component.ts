import { Component } from '@angular/core';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrl: './atendimento.component.css'
})
export class AtendimentoComponent {

  clientes = [
    {nome: 'Fulano', chegada: new Date(2024, 8, 7), marcadoPara: new Date(2024, 8, 7), profissional: 'Jose Victor'},
  ]
  emAtendimento = [
    {nome: 'Fulano', inicio: new Date(2024, 8, 7), profissional: 'Jose Victor'},
  ]
}
