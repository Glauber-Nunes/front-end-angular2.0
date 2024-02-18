import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Servico } from 'src/app/model/Servico';
import { ServicoService } from 'src/app/services/servico.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-servico-update',
  templateUrl: './servico-update.component.html',
  styleUrls: ['./servico-update.component.css']
})
export class ServicoUpdateComponent implements OnInit {

  servico_id='';

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

  constructor(private router: Router, private service:ServicoService,private route:ActivatedRoute,
    private toast:ToastrService,
    private fb: FormBuilder) { 
      this.formulario = this.fb.group({
      nome: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.servico_id = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById():void{
    this.service.findById(this.servico_id).subscribe((resposta=>{
    this.servico = resposta;
  }))
}

update():void{
  this.service.update(this.servico).subscribe((resposta=>{
  this.router.navigate(['servicos'])
  this.toast.info('Serviço Atualizado Com Sucesso!');
}), err =>{
  if(err.error.error.match('Ja Cadastrado')){
    this.toast.error(err.error.error)
    console.log(err)
  }else{
   
  }
})
}
cancelar():void{
  this.router.navigate(['servicos']);
}

}
