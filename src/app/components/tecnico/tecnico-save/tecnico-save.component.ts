import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/model/Tecnico';
import { ServicoService } from 'src/app/services/servico.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-save',
  templateUrl: './tecnico-save.component.html',
  styleUrls: ['./tecnico-save.component.css']
})
export class TecnicoSaveComponent implements OnInit {

  tecnico:Tecnico={
    id:null,
    nome:''
  }

  formulario: FormGroup;

  nome = new FormControl(null,Validators.minLength(5))
  
  validaCampos():boolean{
    if(this.nome.valid){
      return true;
    }else{
      return false;
    }
  }
  constructor(private service:TecnicoService,private toast:ToastrService,private router: Router,
    private fb: FormBuilder) { 
      this.formulario = this.fb.group({
      nome: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
  }

  
  save():void{
    this.service.save(this.tecnico).subscribe((resposta)=>{
    this.router.navigate(['/tecnicos'])
    this.toast.info('Tecnico Inserido Com Sucesso!');
    }, err =>{
      if(err.error.error.match('Ja Cadastrado')){
        this.toast.error(err.error.error)
        console.log(err)
      }else{
       
      }
    })
  }

  cancelar():void{
    this.router.navigate(['tecnicos']);
  }
}
