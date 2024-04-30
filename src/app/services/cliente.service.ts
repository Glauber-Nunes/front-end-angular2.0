import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/Cliente';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Url } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  findAll() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrlApi}/clientes`)
  }

  findById(id:any):Observable<Cliente>{
    return this.http.get<Cliente>(`${API_CONFIG.baseUrlApi}/clientes/`+id)
  }

  //funçao para criar novo cliente
  save(cliente:Cliente):Observable<Cliente>{
    const url =(`${API_CONFIG.baseUrlApi}/clientes`);
    return this.http.post<Cliente>(url,cliente);
  }
  
  update(cliente:Cliente):Observable<Cliente>{
    const url = (`${API_CONFIG.baseUrlApi}/clientes/`+ cliente.id) ;
    return this.http.put<Cliente>(url,cliente);
  }

  delete(id:any):Observable<void>{
   const url = (`${API_CONFIG.baseUrlApi}/clientes/`+id);
   return this.http.delete<void>(url)
  }

  countCliente(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrlApi}/clientes/count`);
  }
}
