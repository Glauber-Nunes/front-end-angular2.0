import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Servico } from 'src/app/model/Servico';
import { ProdutoService } from 'src/app/services/produto.service';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-servico-save',
  templateUrl: './servico-save.component.html',
  styleUrls: ['./servico-save.component.css']
})
export class ServicoSaveComponent implements OnInit {

  servico:Servico={
    id:null,
    descricao:'',
    preco:0
  }

  formulario: FormGroup;

  descricao = new FormControl(null,Validators.minLength(5))
  preco = new FormControl(null,Validators.minLength(1))

  validaCampos():boolean{
    if(this.descricao.valid && this.preco.valid){
      return true;
    }else{
      return false;
    }
  }

  constructor(private router: Router, private service:ServicoService,
    private toast:ToastrService,
    private fb: FormBuilder) { 
      this.formulario = this.fb.group({
      nome: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  cancelar():void{
    this.router.navigate(['servicos']);
  }

  save():void{
    this.service.save(this.servico).subscribe((resposta)=>{
    this.router.navigate(['/servicos'])
    this.toast.info('Serviço Inserido Com Sucesso!');
    }, err =>{
      if(err.error.error.match('Ja Cadastrado')){
        this.toast.error(err.error.error)
        console.log(err)
      }else{
       
      }
    })
  }
}
