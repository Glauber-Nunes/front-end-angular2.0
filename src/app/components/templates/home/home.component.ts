import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario:Usuario={
    id:null,
    email:'',
    nome:'',
    senha:''
  }
  constructor() { }

  ngOnInit(): void {
  }

  mostrarBotoes = false;

  toggleButtons() {
    this.mostrarBotoes = !this.mostrarBotoes;
  }
}
