import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/model/Usuario';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  nome = new FormControl(null,Validators.minLength(3))
  email = new FormControl(null,Validators.email);
  senha = new FormControl(null,Validators.minLength(3));


  constructor(private toast:ToastrService,private service: UsuarioService,
    private router:Router) { 
    
  }

   usuario:Usuario ={
    id:'',
    nome:'',
    email:'',
    senha:''
  }

  ngOnInit(): void {
  }

  save():void{
    this.service.save(this.usuario).subscribe((resposta)=>{
    this.router.navigate(['/login'])
    this.toast.info('Cadastro Realizado Com Sucesso!');
    }, err =>{
      if(err.error.error.match('Ja Cadastrado')){
        this.toast.error(err.error.error)
        console.log(err)
      }else{
       
      }
    })
  }

  validaCampos():boolean{
    if(this.email.valid && this.senha.valid){
      return true;
    }else{
      return false;
    }
  }

  voltar(){
    this.router.navigate(['login'])
  }
}
