import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemPedido, ItemPedidoImput } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  categoriaUrl = 'http://localhost:8080/categorias'
  produtoUrl = 'http://localhost:8080/produtos'
  itemPedidoUrl = 'http://localhost:8080/itemPedidos'

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

}
