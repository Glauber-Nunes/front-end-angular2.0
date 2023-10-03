import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servico } from '../model/Servico';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http:HttpClient) { }

  findAll() : Observable<Servico[]> {
    return this.http.get<Servico[]>(`${API_CONFIG.baseUrlApi}/servicos`)
  }
}
