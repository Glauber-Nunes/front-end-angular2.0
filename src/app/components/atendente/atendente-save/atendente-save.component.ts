import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Atendente } from 'src/app/model/Atendente';
import { AtendenteService } from 'src/app/services/atendente.service';

@Component({
  selector: 'app-atendente-save',
  templateUrl: './atendente-save.component.html',
  styleUrls: ['./atendente-save.component.css']
})
export class AtendenteSaveComponent implements OnInit {

  formulario: FormGroup;

  nome = new FormControl(null,Validators.minLength(5))
  cpf = new FormControl(null,Validators.minLength(11))

  validaCampos():boolean{
    if(this.nome.valid && this.cpf.valid && this.nome.valid){
      return true;
    }else{
      return false;
    }
  }

  atendente:Atendente = {
    id:null,
    nome:'',
    cpf:''
  }

  constructor(private service:AtendenteService, private router:Router,private toast:ToastrService,
    private fb: FormBuilder) { 
        this.formulario = this.fb.group({
        nome: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
  }


  save():void{
    this.service.save(this.atendente).subscribe((resposta)=>{
    this.router.navigate(['/atendentes'])
    this.toast.info('Atendente Salvo Com Sucesso!');
    }, err =>{
      if(err.error.error.match('Ja Cadastrado')){
        this.toast.error(err.error.error)
        console.log(err)
      }else{
       
      }
    })
  }

  cancelar(){
    this.router.navigate(['/atendentes'])
  }
}
