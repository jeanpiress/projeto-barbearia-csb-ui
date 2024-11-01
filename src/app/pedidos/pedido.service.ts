import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  pedidoUrl = 'http://localhost:8080/pedidos'

  constructor(private http: HttpClient) { }

  pesquisarPedidosPagosCaixaAberto(): Observable<any>{
    return this.http.get(`${this.pedidoUrl}`)
  }

  excluirPedido(codigo: number): Observable<void>{
    return this.http.delete<void>(`${this.pedidoUrl}/excluir/${codigo}`)
  }

  pesquisarPedidosAguardando(): Observable<any>{
    return this.http.get(`${this.pedidoUrl}/aguardando`)
  }

  pesquisarPedidosEmAtendimento(): Observable<any>{
    return this.http.get(`${this.pedidoUrl}/emAtendimento`)
  }

  cancelarPedido(codigo: number): Observable<void>{
    return this.http.delete<void>(`${this.pedidoUrl}/cancelar/${codigo}`)
  }

  alterarPedidoParaEmAtendimento(codigo: number): Observable<void>{
    return this.http.put<void>(`${this.pedidoUrl}/${codigo}/iniciar`, {})
  }

  novoPedido(pedido: any): Observable<void>{
    return this.http.post<void>(`${this.pedidoUrl}`, pedido)
  }

  alterarProfissional(pedidoId: string, profissionalId: string): Observable<void>{
    return this.http.put<void>(`${this.pedidoUrl}/${pedidoId}/profissional/${profissionalId}`, {})
  }

  buscarPedidoporId(pedidoId: string): Observable<any>{
    return this.http.get(`${this.pedidoUrl}/${pedidoId}`)
  }

  adicionarItemPedidoAoPedido(pedidoId: string, itemPedidoId: string): Observable<void>{
    return this.http.put<void>(`${this.pedidoUrl}/${pedidoId}/add-item/${itemPedidoId}`, {})
  }

  limparPedido(pedidoId: any): Observable<void>{
    return this.http.delete<void>(`${this.pedidoUrl}/${pedidoId}/remove-todos-itens`)
  }

  pagarPedido(codigo: any, formaPagamento: any): Observable<void>{
    return this.http.put<void>(`${this.pedidoUrl}/${codigo}/pagar`, formaPagamento)
  }
}
