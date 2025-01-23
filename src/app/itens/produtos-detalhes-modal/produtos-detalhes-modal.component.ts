import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-produtos-detalhes-modal',
  templateUrl: './produtos-detalhes-modal.component.html',
  styleUrl: './produtos-detalhes-modal.component.css'
})
export class ProdutosDetalhesModalComponent implements OnChanges{
  @Input() produto: any;
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  fotoProdutoUrl: any;

  constructor(private itemService: ItemService
    ){}

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['display'] && this.display) {
        this.carregarFotoProduto();
      }
    }

    carregarFotoProduto(): void {
      this.itemService.getFotoProduto(this.produto.id).subscribe(
        (res: ArrayBuffer) => {
          const blob = new Blob([res], { type: 'image/*' });
          this.fotoProdutoUrl = URL.createObjectURL(blob);
        },
        (err) => {
          console.error('Erro ao carregar a imagem:', err);
          this.fotoProdutoUrl = null;
        }
      );
    }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
