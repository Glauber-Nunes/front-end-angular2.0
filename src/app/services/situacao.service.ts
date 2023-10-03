import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SituacaoOrdem } from '../model/SituacaoOrdem';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class SituacaoService {

  constructor(private http:HttpClient) { }


  findAll() : Observable<SituacaoOrdem[]> {
    return this.http.get<SituacaoOrdem[]>(`${API_CONFIG.baseUrlApi}/situacao-ordens`)
  }
}
