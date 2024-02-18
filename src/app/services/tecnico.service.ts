import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tecnico } from '../model/Tecnico';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http:HttpClient) { }

  findAll() : Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrlApi}/tecnicos`)
  }

  save(tecnico:Tecnico):Observable<Tecnico>{
    const url =(`${API_CONFIG.baseUrlApi}/tecnicos`);
    return this.http.post<Tecnico>(url,tecnico);
  }

  delete(id:any):Observable<void>{
    const url = (`${API_CONFIG.baseUrlApi}/tecnicos/`+id);
    return this.http.delete<void>(url)
   }

   
  findById(id:any):Observable<Tecnico>{
    return this.http.get<Tecnico>(`${API_CONFIG.baseUrlApi}/tecnicos/`+id)
  }

}
