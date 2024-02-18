import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http:HttpClient) { }

  findAll() : Observable<Produto[]> {
    return this.http.get<Produto[]>(`${API_CONFIG.baseUrlApi}/produtos`)
  }

  findById(id:any):Observable<Produto>{
    return this.http.get<Produto>(`${API_CONFIG.baseUrlApi}/produtos/`+id)
  }

  save(produto:Produto):Observable<Produto>{
    const url =(`${API_CONFIG.baseUrlApi}/produtos`);
    return this.http.post<Produto>(url,produto);
  }

  delete(id:any):Observable<void>{
    const url = (`${API_CONFIG.baseUrlApi}/produtos/`+id);
    return this.http.delete<void>(url)
   }

   update(produto:Produto):Observable<Produto>{
    const url = (`${API_CONFIG.baseUrlApi}/produtos/`+ produto.id) ;
    return this.http.put<Produto>(url,produto);
  }
}
