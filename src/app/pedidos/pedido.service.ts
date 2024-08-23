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
}
