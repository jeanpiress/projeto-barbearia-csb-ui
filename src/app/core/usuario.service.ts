import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioUrl = 'http://localhost:8080/usuarios'

  constructor(private http: HttpClient) { }

  uploadFotoUsuario(usuarioId: number, file: File): Observable<any>{
      const formData = new FormData();
      formData.append('arquivo', file);
      formData.append('descricao', `Foto do usuario de id ${usuarioId}`);

      return this.http.put(`${this.usuarioUrl}/${usuarioId}/foto`, formData);
    }

  buscarUsuario(id: number, ocupacao: string): Observable<any>{
    let params = new HttpParams()
          .set('ocupacao', ocupacao);

    return this.http.get(`${this.usuarioUrl}/ocupacao/${id}`, {params});
  }
}
