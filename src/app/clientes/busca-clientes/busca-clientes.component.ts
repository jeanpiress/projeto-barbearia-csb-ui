import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busca-clientes',
  templateUrl: './busca-clientes.component.html',
  styleUrl: './busca-clientes.component.css'
})
export class BuscaClientesComponent implements OnInit{
  nomeBusca: string = '';
  clientes = []

  constructor(private clienteService: ClienteService){}

  ngOnInit() {
  }

  pesquisar(){
    this.clienteService.pesquisar(this.nomeBusca).subscribe(clientes => this.clientes = clientes);
  }
}
