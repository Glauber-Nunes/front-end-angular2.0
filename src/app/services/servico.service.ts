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

  findById(id:any):Observable<Servico>{
    return this.http.get<Servico>(`${API_CONFIG.baseUrlApi}/servicos/`+id)
  }

  save(servico:Servico):Observable<Servico>{
    const url =(`${API_CONFIG.baseUrlApi}/servicos`);
    return this.http.post<Servico>(url,servico);
  }

  delete(id:any):Observable<void>{
    const url = (`${API_CONFIG.baseUrlApi}/servicos/`+id);
    return this.http.delete<void>(url)
   }

   update(servico:Servico):Observable<Servico>{
    const url = (`${API_CONFIG.baseUrlApi}/servicos/`+ servico.id) ;
    return this.http.put<Servico>(url,servico);
  }
}
