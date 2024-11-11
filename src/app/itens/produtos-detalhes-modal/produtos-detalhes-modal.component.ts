import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-produtos-detalhes-modal',
  templateUrl: './produtos-detalhes-modal.component.html',
  styleUrl: './produtos-detalhes-modal.component.css'
})
export class ProdutosDetalhesModalComponent {
  @Input() produto: any;
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
