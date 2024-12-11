import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profissional, ProfissionalInput } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  profissionalUrl = 'http://localhost:8080/profissionais'

  constructor(private http: HttpClient) { }

  pesquisarProfissionais(isAtivo: string): Observable<any>{
    return this.http.get(`${this.profissionalUrl}/${isAtivo}`)
  }

  ativarInativar(isAtivo: string, profissionalId: any): Observable<any>{
    isAtivo = isAtivo === 'ativos' ? 'inativar' : 'ativar';
    return this.http.put(`${this.profissionalUrl}/${profissionalId}/${isAtivo}`, {})
  }

  novoProfissional(profissional: ProfissionalInput): Observable<any>{
    return this.http.post(`${this.profissionalUrl}`, profissional);
  }
}
