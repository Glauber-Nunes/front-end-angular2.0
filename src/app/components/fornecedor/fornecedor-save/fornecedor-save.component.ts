import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { Uf } from 'src/app/model/Uf';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { UfService } from 'src/app/services/uf.service';

@Component({
  selector: 'app-fornecedor-save',
  templateUrl: './fornecedor-save.component.html',
  styleUrls: ['./fornecedor-save.component.css']
})
export class FornecedorSaveComponent implements OnInit {

  constructor(private ufService:UfService, private service:FornecedorService,
    private router:Router,private toast:ToastrService) { }

  fornecedor : Fornecedor = {
    id: '',
    nome:'',
    municipio:'',
    cnpj: '',
    uf:null
  }

  ufs: Uf [] = [];

  formulario: FormGroup;

  nome = new FormControl(null,Validators.minLength(5))
  cnpj = new FormControl(null,Validators.minLength(11))
  municipio = new FormControl(null,Validators.minLength(11))
  uf = new FormControl(null,Validators.nullValidator)

  validaCampos():boolean{
    if(this.nome.valid && this.cnpj.valid && this.nome.valid){
      return true;
    }else{
      return false;
    }
  }

  listaUF():void{
    this.ufService.findAll().subscribe((resposta=>{
    this.ufs = resposta;
  }))
}

  ngOnInit(): void {
    this.listaUF();
  }

  save():void{
    this.service.save(this.fornecedor).subscribe((resposta)=>{
    this.router.navigate(['/fornecedores'])
    this.toast.info('Fornecedor Salvo Com Sucesso!');
    }, err =>{
      if(err.error.error.match('Ja Cadastrado')){
        this.toast.error(err.error.error)
        console.log(err)
      }else{
       
      }
    })
  }


  cancelar(){
    this.router.navigate(['/fornecedores'])
  }
  
}
