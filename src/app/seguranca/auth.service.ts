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
          console.log('Resposta da autenticação:', response);
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
    console.log('Token armazenado:', token); // Adiciona este log
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      console.log('Token carregado do localStorage:', token); // Adiciona este log
      this.armazenarToken(token);
    } else {
      console.log('Nenhum token encontrado no localStorage.'); // Adiciona este log
    }
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Token recuperado pelo getToken:', token); // Adiciona este log
    return token;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    return token ? this.jwtHelper.isTokenExpired(token) : true;
  }

  logout() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
    console.log('Usuário deslogado. Token removido.'); // Adiciona este log
  }

  temPermissao(permissao: string){
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  isAccessTokenInvalido(){
    const token = localStorage.getItem('token')

    return !token || this.jwtHelper.isTokenExpired(token);
  }
}
