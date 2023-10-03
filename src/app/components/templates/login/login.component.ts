import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credencial } from 'src/app/model/Credencial';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

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

  email = new FormControl(null,Validators.email);
  senha = new FormControl(null,Validators.minLength(3));

  constructor(private toast:ToastrService,private authService: AutenticacaoService,
    private router:Router) { 
    
  }

  ngOnInit(): void {

  }

  logar(){
      this.authService.autenticacao(this.credencial).subscribe(resposta=>{
      this.authService.sucessoLogin(resposta.headers.get('Authorization').substring(7))
      this.router.navigate([''])
      this.toast.info('Logado Com Sucesso!');
    }, () =>{
      this.toast.error('Usuário e/ou senha inválidos','Login');
    })
  }

  //valida se os campos email e senha estao preenchidos, enquanto nao o botao fica disabled
  validaCampos():boolean{
    if(this.email.valid && this.senha.valid){
      return true;
    }else{
      return false;
    }
  }

 
}
