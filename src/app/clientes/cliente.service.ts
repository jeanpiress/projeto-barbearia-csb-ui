import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clienteUrl = 'http://localhost:8080/clientes'

  constructor(private http: HttpClient) { }

  pesquisar(nome: string): Observable<any>{
    let params = new HttpParams().set('nome', nome);

    return this.http.get(`${this.clienteUrl}`, { params }).pipe(
      map(response => {
        return response;
      })
    );
  }

}
