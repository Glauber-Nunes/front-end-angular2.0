import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Atendente } from 'src/app/model/Atendente';
import { AtendenteService } from 'src/app/services/atendente.service';

@Component({
  selector: 'app-atedente-update',
  templateUrl: './atedente-update.component.html',
  styleUrls: ['./atedente-update.component.css']
})
export class AtedenteUpdateComponent implements OnInit {

  id_atendente = ''

  atendente:Atendente = {
    id:null,
    nome:'',
    cpf:''
  }

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

  constructor(private service:AtendenteService, private router:Router,private toast:ToastrService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id_atendente = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  update():void{
    this.service.update(this.atendente).subscribe((resposta=>{
    this.router.navigate(['atendentes'])
    this.toast.info('Atendente Atualizado Com Sucesso!');
  }), err =>{
    if(err.error.error.match('Ja Cadastrado')){
      this.toast.error(err.error.error)
      console.log(err)
    }else{
     
    }
  })
}

cancelar():void{
  this.router.navigate(['atendentes'])
}

findById():void{
  this.service.findById(this.id_atendente).subscribe((resposta=>{
    this.atendente = resposta;
  }))
}

}
