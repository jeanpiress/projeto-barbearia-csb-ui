import { StatusPagamento } from './../core/model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  pedidoUrl = 'http://localhost:8080/pedidos'

  constructor(private http: HttpClient) { }

  excluirPedido(codigo: number): Observable<void>{
    return this.http.delete<void>(`${this.pedidoUrl}/excluir/${codigo}`)
  }

  pesquisarTodosPedidos(): Observable<any> {
    return this.http.get(`${this.pedidoUrl}`);
  }

  pesquisarPedidoPorDataExcetoStatus(horario: string, statusPedido: string): Observable<any> {
    let params = new HttpParams()
    .set('horario', horario)
    .set('statusPedido', statusPedido);

    return this.http.get(`${this.pedidoUrl}/horario`, {params});
  }

  pesquisarPedidosExceto(status: string): Observable<any> {
    let params = new HttpParams().set('status', status);

    return this.http.get(`${this.pedidoUrl}/exeto`, {params});
  }


  pesquisarPedidosPorStatusPagamentoEIsAberto(caixaAberto: boolean | null, statusPagamento: string | null): Observable<any> {
    let params = new HttpParams();

    if (caixaAberto !== null) {
      params = params.set('isAberto', caixaAberto);
    }
    if (statusPagamento !== null) {
      params = params.set('statusPagamento', statusPagamento);
    }

    return this.http.get(`${this.pedidoUrl}/caixa`, { params });
  }

  pesquisarPedidosPorStatus(statusPedido: string | null, statusPagamento: string | null): Observable<any> {
    let params = new HttpParams();
    if (statusPedido !== null) {
      params = params.set('statusPedido', statusPedido);
    }
    if (statusPagamento !== null) {
      params = params.set('statusPagamento', statusPagamento);
    }

    return this.http.get(`${this.pedidoUrl}/status`, { params });
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

  alterarPedido(pedido: any, id: any): Observable<void>{
    return this.http.put<void>(`${this.pedidoUrl}/${id}`, pedido)
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
