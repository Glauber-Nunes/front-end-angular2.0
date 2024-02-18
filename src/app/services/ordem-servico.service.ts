import { OrdemServico } from 'src/app/model/OrdemServico';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.get<OrdemServico>(`${API_CONFIG.baseUrlApi}/ordem_servicos/`+id);
  }

  save(os:OrdemServico):Observable<OrdemServico>{
    const url =(`${API_CONFIG.baseUrlApi}/ordem_servicos`);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<OrdemServico>(url, JSON.stringify(os), { headers: headers });
  }

  // funçao para finalizar serviço
  finalizaServico(os:OrdemServico):Observable<OrdemServico>{
    const url = (`${API_CONFIG.baseUrlApi}/ordem_servicos/finalizar-servico/`+ os.id);
    return this.http.put<OrdemServico>(url,os);
  }
}
