import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-clientes-detalhes',
  templateUrl: './clientes-detalhes.component.html',
  styleUrls: ['./clientes-detalhes.component.css']
})
export class ClientesDetalhesComponent implements OnInit {
  @Input() cliente: any;
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  ngOnInit() {
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
