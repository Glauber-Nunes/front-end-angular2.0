import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Atendente } from '../model/Atendente';

@Injectable({
  providedIn: 'root'
})
export class AtendenteService {

  constructor(private http: HttpClient) { }

  findAll() : Observable<Atendente[]> {
    return this.http.get<Atendente[]>(`${API_CONFIG.baseUrlApi}/atendentes`)
  }

  findById(id:any):Observable<Atendente>{
    return this.http.get<Atendente>(`${API_CONFIG.baseUrlApi}/atendentes/`+id)
  }

  save(atendente:Atendente):Observable<Atendente>{
    const url =(`${API_CONFIG.baseUrlApi}/atendentes`);
    return this.http.post<Atendente>(url,atendente);
  }

  replica(id:any):Observable<Atendente>{
    return this.http.get<Atendente>(`${API_CONFIG.baseUrlApi}/atendentes/replica/`+id)
  }

  update(atendente:Atendente):Observable<Atendente>{
    const url = (`${API_CONFIG.baseUrlApi}/atendentes/`+ atendente.id) ;
    return this.http.put<Atendente>(url,atendente);
  }

  delete(id:any):Observable<void>{
    const url = (`${API_CONFIG.baseUrlApi}/atendentes/`+id);
    return this.http.delete<void>(url)
   }
  
}
