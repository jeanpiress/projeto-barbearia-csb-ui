import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable } from 'rxjs';
import { ErrorHandlerService } from '../core/error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private errorHandler: ErrorHandlerService
  ) {
    this.carregarToken(); // Carrega o token ao iniciar o serviço
  }

  login(usuario: string, senha: string): Observable<void> {
    let headers = new HttpHeaders().set('Authorization', 'Basic Y3NiLXdlYjp3ZWIxMjM=');
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthUrl, body, { headers, withCredentials: true })
      .pipe(
        map(response => {
          this.armazenarToken(response.access_token);
        }),
        catchError(error => {
          // Trata apenas o erro específico de senha ou usuário inválidos
          if (error.status === 400 && error.error.error === 'invalid_grant') {
            this.errorHandler.showCustomError('Erro de autenticação', 'Usuário inexistente ou senha inválida');
            return new Observable<void>(); // Interrompe a propagação do erro
          }
          // Retorna todos os outros erros para serem tratados pelo ErrorHandlerService
          return this.errorHandler.handle(error);
        })
      );
  }



  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token); // Armazena o token no localStorage
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
