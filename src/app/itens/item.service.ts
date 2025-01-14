import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    return this.http.get(`${this.produtoUrl}`, { params });
  }

  desativarProduto(produtoId: any): Observable<void>{
    return this.http.delete<void>(`${this.produtoUrl}/${produtoId}/desativar`);
  }

  editarProduto(produtoId: any, produto: ProdutoInput): Observable<any>{
    return this.http.put(`${this.produtoUrl}/${produtoId}`, produto);
  }

  uploadFotoProduto(produtoId: number, file: File): Observable<any>{
    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('descricao', `Foto do produto de id ${produtoId}`);

    return this.http.put(`${this.produtoUrl}/${produtoId}/foto`, formData);
  }

  getFotoProduto(produtoId: number): Observable<ArrayBuffer> {
    const headers = new HttpHeaders({
      'Accept': 'image/*'
    });

    return this.http.get(`${this.produtoUrl}/${produtoId}/foto`, {
      headers: headers,
      responseType: 'arraybuffer' as const,
      observe: 'body'
    });
  }



}
