import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdemServico } from '../model/OrdemServico';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {

  constructor(private http: HttpClient) { }

  findAll() : Observable<OrdemServico[]> {
    return this.http.get<OrdemServico[]>(`${API_CONFIG.baseUrlApi}/ordem_servicos`)
  }

  findById(id:any):Observable<OrdemServico>{
    return this.http.get<OrdemServico>(`${API_CONFIG.baseUrlApi}/ordem_servicos/`+id)
  }

  save(os:OrdemServico):Observable<OrdemServico>{
    const url =(`${API_CONFIG.baseUrlApi}/ordem_servicos`);
    return this.http.post<OrdemServico>(url,os);
  }
}
