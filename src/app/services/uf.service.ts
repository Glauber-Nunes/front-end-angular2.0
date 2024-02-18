import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Uf } from '../model/Uf';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UfService {

  constructor(private http:HttpClient) { }

  findAll() : Observable<Uf[]> {
    return this.http.get<Uf[]>(`${API_CONFIG.baseUrlApi}/ufs`)
  }

  findById(id:any):Observable<Uf>{
    return this.http.get<Uf>(`${API_CONFIG.baseUrlApi}/ufs/`+id)
  }

}
