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
}
