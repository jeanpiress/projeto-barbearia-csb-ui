import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemPedido, ItemPedidoImput, Produto, ProdutoInput } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  categoriaUrl = 'http://localhost:8080/categorias'
  produtoUrl = 'http://localhost:8080/produtos'
  itemPedidoUrl = 'http://localhost:8080/itemPedidos'
  pedidoUrl = 'http://localhost:8080/pedidos'

  constructor(private http: HttpClient) { }

  pesquisarCategorias(): Observable<any>{
    return this.http.get(`${this.categoriaUrl}`)
  }

  pesquisarProduto(categoriaId: any): Observable<any>{
    return this.http.get(`${this.produtoUrl}/categoria/${categoriaId}`)
  }

  criarItemPedido(itemPedido: ItemPedidoImput): Observable<ItemPedido>{
    return this.http.post<ItemPedido>(`${this.itemPedidoUrl}`, itemPedido);
  }

  criarItemEAdicionarEmPedido(itensPedidos: any, pedidoId: any): Observable<ItemPedido>{
    return this.http.put<ItemPedido>(`${this.pedidoUrl}/${pedidoId}/add-itens`, itensPedidos);
  }

  criarNovoProduto(produto: ProdutoInput): Observable<Produto>{
    return this.http.post<Produto>(`${this.produtoUrl}`, produto);
  }

  buscarProdutos(nome: string, isAtivo: boolean, categoriaId?: any): Observable<any>{
    let params = new HttpParams()
      .set('nome', nome)
      .set('isAtivo', isAtivo.toString());

    if(categoriaId != null){
      params = params.set('categoriaId', categoriaId);}
      console.log(params);

    return this.http.get(`${this.produtoUrl}`, { params });
  }

  desativarProduto(produtoId: any): Observable<void>{
    return this.http.delete<void>(`${this.produtoUrl}/${produtoId}/desativar`);
  }

  editarProduto(produtoId: any, produto: ProdutoInput): Observable<any>{
    return this.http.put(`${this.produtoUrl}/${produtoId}`, produto);
  }
}
