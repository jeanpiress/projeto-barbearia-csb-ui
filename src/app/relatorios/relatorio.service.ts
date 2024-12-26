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
    return this.http.post(`${this.relatorioUrl}/comissoes/data`, body);
  }

  pesquisarComissoesProfissional(dataInicio: any, dataFim: any, profissionalId: number): Observable<any>{
    let params = new HttpParams()
    .set('dataInicio', dataInicio)
    .set('dataFim', dataFim);

    return this.http.get(`${this.relatorioUrl}/comissoes/${profissionalId}`, {params});
  }

  pesquisarClientesRetorno(diasBusca : any): Observable<any>{
    return this.http.get(`${this.relatorioUrl}/cliente/volta/${diasBusca}`);
  }
}
