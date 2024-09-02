import { ClienteInput } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clienteUrl = 'http://localhost:8080/clientes'

  constructor(private http: HttpClient) { }

  pesquisar(nome: string): Observable<any>{
    let params = new HttpParams().set('nome', nome);

    return this.http.get(`${this.clienteUrl}`, { params })
  }

  excluir(codigo: number): Observable<void>{
    return this.http.delete<void>(`${this.clienteUrl}/${codigo}`)}

  novoCliente(cliente: ClienteInput): Observable<any>{
    return this.http.post(`${this.clienteUrl}`, cliente);
  }

  editarCliente(clienteId: any, cliente: ClienteInput): Observable<any>{
    return this.http.put(`${this.clienteUrl}/${clienteId}`, cliente);
  }
}
