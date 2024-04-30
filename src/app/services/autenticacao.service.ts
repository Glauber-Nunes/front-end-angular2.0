import { Injectable } from '@angular/core';
import { Credencial } from '../model/Credencial';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  jwtService: JwtHelperService = new JwtHelperService();

  usuarioLogado: any;

  constructor(private http: HttpClient) { }

  autenticacao(credencial : Credencial){
    return this.http.post(`${API_CONFIG.baseUrlApi}/login`,credencial,{
      observe: 'response',
      responseType:'text'
    })
  }

  sucessoLogin(authToken: string){
    localStorage.setItem('token', authToken);
  }

  estaAutenticado(){
    let token = localStorage.getItem('token')
    if(token != null){
      return !this.jwtService.isTokenExpired(token)
    }

    return false;
  }

  sair(){
    localStorage.clear();
  }

  recuperarDadosUsuario() {
    let token = localStorage.getItem('token');
    if (token) {
      let decodedToken = this.jwtService.decodeToken(token);
      this.usuarioLogado = decodedToken;
      localStorage.setItem('usuario', JSON.stringify(decodedToken));
    }
  }
}
