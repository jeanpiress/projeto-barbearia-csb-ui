import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {

  caixaUrl = 'http://localhost:8080/caixa'
  pedidoUrl = 'http://localhost:8080/pedidos'

  constructor(private http: HttpClient) { }

  pesquisarValoresCaixaAberto(): Observable<any>{
    return this.http.get(`${this.caixaUrl}`)
  }

  pesquisarPedidosPagosCaixaAberto(): Observable<any>{
    return this.http.get(`${this.pedidoUrl}`)
  }

  fecharCaixa(): Observable<void>{
    return this.http.delete<void>(`${this.caixaUrl}/fechar`)
  }

  excluirPedido(codigo: number): Observable<void>{
    return this.http.delete<void>(`${this.pedidoUrl}/excluir/${codigo}`)
  }

}
