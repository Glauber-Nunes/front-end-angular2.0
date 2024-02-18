import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { Uf } from 'src/app/model/Uf';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { UfService } from 'src/app/services/uf.service';

@Component({
  selector: 'app-fornecedor-update',
  templateUrl: './fornecedor-update.component.html',
  styleUrls: ['./fornecedor-update.component.css']
})
export class FornecedorUpdateComponent implements OnInit {

  id_fornecedor = ''
  id_uf = ''

  constructor(private toast:ToastrService,private router:Router,private ufService:UfService, private route:ActivatedRoute,private service:FornecedorService) { }

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
    this.id_fornecedor = this.route.snapshot.paramMap.get('id')!
    this.findById();
    this.listaUF();
  }

  findById():void{
      this.service.findById(this.id_fornecedor).subscribe((resposta=>{
      this.fornecedor = resposta;
    }))
  }

  findByIdUF():void{
    this.ufService.findById(this.id_uf).subscribe((resposta=>{
    this.fornecedor.uf = resposta;
  }))
}

cancelar(){
  this.router.navigate(['/fornecedores'])
}


update():void{
  this.service.update(this.fornecedor).subscribe((resposta=>{
  this.router.navigate(['fornecedores'])
  this.toast.info('Fornecedor Atualizado Com Sucesso!');
}), err =>{
  if(err.error.error.match('Ja Cadastrado')){
    this.toast.error(err.error.error)
    console.log(err)
  }else{
   
  }
})
}

}
