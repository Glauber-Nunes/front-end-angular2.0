import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credencial } from 'src/app/model/Credencial';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credencial : Credencial = {
    email : '',
    senha: ''
  }

 
  constructor() { }

  ngOnInit(): void {
  }

  email = new FormControl(null,Validators.email);
  senha = new FormControl(null,Validators.minLength(3));
  //valida se os campos email e senha estao preenchidos, enquanto nao o botao fica disabled
  validaCampos():boolean{
    if(this.email.valid && this.senha.valid){
      return true;
    }else{
      return false;
    }
  }
}
