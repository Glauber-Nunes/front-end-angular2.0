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
}
