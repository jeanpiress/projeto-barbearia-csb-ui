import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria, CategoriaId, Produto, ProdutoInput } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { ItemService } from '../item.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-produtos-editar-modal',
  templateUrl: './produtos-editar-modal.component.html',
  styleUrl: './produtos-editar-modal.component.css'
})
export class ProdutosEditarModalComponent implements OnInit{
  @Input() produto: any =  new Produto();
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() produtoSalvo = new EventEmitter<void>();

  categorias: any[] = []
  categoriaSelecionada: any = null;

  constructor(
    private itemService: ItemService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService
  ){}

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

  salvar(){
    const categoria = new CategoriaId();
    categoria.id = this.categoriaSelecionada.value;

    const produtoImput = new ProdutoInput();
    produtoImput.nome = this.produto?.nome ?? '';
    produtoImput.preco = this.produto?.preco;
    produtoImput.precoEmPontos = this.produto?.precoEmPontos;
    produtoImput.temEstoque = this.produto?.temEstoque;
    produtoImput.estoque = this.produto?.estoque;
    produtoImput.vendidoPorPonto = this.produto?.vendidoPorPonto;
    produtoImput.pesoPontuacaoCliente = this.produto?.pesoPontuacaoCliente;
    produtoImput.pesoPontuacaoProfissional = this.produto?.pesoPontuacaoProfissional;
    produtoImput.comissaoBase = this.produto?.comissaoBase;
    produtoImput.categoria = categoria;
    console.log(this.produto, categoria);

    this.itemService.editarProduto(this.produto.id, produtoImput).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Produto editado com sucesso!');
        this.produtoSalvo.emit();
        this.close();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }
    });
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
