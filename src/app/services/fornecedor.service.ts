import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fornecedor } from '../model/Fornecedor';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private http: HttpClient) { }

  findAll() : Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${API_CONFIG.baseUrlApi}/fornecedores`)
  }

  findById(id:any):Observable<Fornecedor>{
    return this.http.get<Fornecedor>(`${API_CONFIG.baseUrlApi}/fornecedores/`+id)
  }

  save(fornecedor:Fornecedor):Observable<Fornecedor>{
    const url =(`${API_CONFIG.baseUrlApi}/fornecedores`);
    return this.http.post<Fornecedor>(url,fornecedor);
  }

  update(fornecedor:Fornecedor):Observable<Fornecedor>{
    const url = (`${API_CONFIG.baseUrlApi}/fornecedores/`+ fornecedor.id) ;
    return this.http.put<Fornecedor>(url,fornecedor);
  }

  delete(id:any):Observable<void>{
    const url = (`${API_CONFIG.baseUrlApi}/fornecedores/`+id);
    return this.http.delete<void>(url)
   }
  
}
