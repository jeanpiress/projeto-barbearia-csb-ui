import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-detalhes-pedido-modal',
  templateUrl: './detalhes-pedido-modal.component.html',
  styleUrl: './detalhes-pedido-modal.component.css'
})
export class DetalhesPedidoModalComponent implements OnInit{
  @Input() agendamento: any;
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
