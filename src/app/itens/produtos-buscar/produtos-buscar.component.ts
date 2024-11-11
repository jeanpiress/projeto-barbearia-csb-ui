import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/notification.service';
import { ItemService } from '../item.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { map } from 'rxjs';
import { Categoria } from '../../core/model';

@Component({
  selector: 'app-produtos-buscar',
  templateUrl: './produtos-buscar.component.html',
  styleUrl: './produtos-buscar.component.css'
})
export class ProdutosBuscarComponent implements OnInit{
  nomeBusca: string = '';
  isAtivo: boolean = false;
  produtos = [];
  categoriaSelecionada: any = null;
  categorias: any[] = [];
  selectedProduto: any;
  displayNovoProduto: boolean = false;
  displayDetalhes: boolean = false;
  displayEditar: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private itemService: ItemService,
    private errorHandler: ErrorHandlerService) {}

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
      });
  }

  pesquisar(isAtivo: boolean){
    const categoriaId = this.categoriaSelecionada != null ? this.categoriaSelecionada.value : null;
    this.itemService.buscarProdutos(this.nomeBusca, isAtivo, categoriaId).subscribe(produtos => this.produtos = produtos);
  }

  novoProduto(produto: any){
    this.displayNovoProduto = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.selectedProduto = produto;
      this.displayNovoProduto  = true;
    }, 0);
  }

  desativar(cliente: any){
    this.itemService.desativarProduto(cliente.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Produto desativado com sucesso!');
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
    this.pesquisar(this.isAtivo);
  }

  mostrarDetalhes(produto: any) {
    this.displayDetalhes = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.selectedProduto = produto;
      this.displayDetalhes  = true;
    }, 0);
  }

  editarProduto(produto: any) {
    this.displayEditar = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.selectedProduto = produto;
      this.displayEditar  = true;
    }, 0);
  }

}
