import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicoOrdem } from '../model/composicoes.model/ServicoOrdem';

@Injectable({
  providedIn: 'root'
})
export class ItemServicoService {

  constructor(private http: HttpClient) { }

 
}
