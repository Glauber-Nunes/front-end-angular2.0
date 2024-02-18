import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  save(usuario:Usuario):Observable<Usuario>{
    const url =(`${API_CONFIG.baseUrlApi}/usuarios`);
    return this.http.post<Usuario>(url,usuario);
  }
  
  findById(id:any):Observable<Usuario>{
    return this.http.get<Usuario>(`${API_CONFIG.baseUrlApi}/usuarios/`+id)
  }

}
