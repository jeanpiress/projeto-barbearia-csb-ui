import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria, CategoriaId, ProdutoInput } from '../../core/model';
import { ItemService } from '../item.service';
import { map } from 'rxjs';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';

@Component({
  selector: 'app-produtos-cadastro',
  templateUrl: './produtos-cadastro.component.html',
  styleUrl: './produtos-cadastro.component.css'
})
export class ProdutosCadastroComponent implements OnInit{
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  constructor(private itemService: ItemService,
              private notificationService: NotificationService,
              private errorHandler: ErrorHandlerService
  ){}

  produto = new ProdutoInput();
  categoriaSelecionada: any;
  categorias: any[] = [];

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.itemService.pesquisarCategorias()
      .pipe(
        map((categorias: Categoria[]) =>
          categorias.map(categoria => ({ label: categoria.nome, value: categoria.id }))
        )
      )
      .subscribe(categoriasFormatadas => {
        this.categorias = categoriasFormatadas;
        console.log('Categorias carregadas:', this.categorias);
        this.categoriaSelecionada = this.categorias.find(categoria => categoria.value === 1);
      });
  }

  criarProduto(){
    if (!this.produto.categoria) {
      this.produto.categoria = new CategoriaId();
    }

    this.produto.categoria.id = this.categoriaSelecionada ? this.categoriaSelecionada.value : null;
    this.itemService.criarNovoProduto(this.produto).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Produto criado com sucesso!');
        this.displayChange.emit(false);
        this.produto = new ProdutoInput();
      },
      error: (erro) => {
        this.errorHandler.handle(erro)
      }
    });
  }

}
