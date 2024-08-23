import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  relatorioUrl = 'http://localhost:8080/relatorios'

  constructor(private http: HttpClient) { }

  pesquisarComissoesData(dataInicio: any, dataFim: any): Observable<any>{
    const body = {
      inicio: dataInicio,
      fim: dataFim
    };

    console.log(body)
    return this.http.post(`${this.relatorioUrl}/comissoes/data`, body);
  }
}
