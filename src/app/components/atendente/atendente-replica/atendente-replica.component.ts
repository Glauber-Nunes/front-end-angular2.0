import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Atendente } from 'src/app/model/Atendente';
import { AtendenteService } from 'src/app/services/atendente.service';

@Component({
  selector: 'app-atendente-replica',
  templateUrl: './atendente-replica.component.html',
  styleUrls: ['./atendente-replica.component.css']
})
export class AtendenteReplicaComponent implements OnInit {

  formulario: FormGroup;

  id_atendente =''

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
    id:'',
    nome:'',
    cpf:''
  }

  constructor(private service:AtendenteService, private router:Router,private toast:ToastrService,
    private fb: FormBuilder,private route:ActivatedRoute) { 
        this.formulario = this.fb.group({
        nome: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
    this.id_atendente = this.route.snapshot.paramMap.get('id')!
    this. replica();
  }

 save(): void {
  this.service.save(this.atendente).subscribe(
    (resposta) => {
      this.router.navigate(['/atendentes']);
      this.toast.info('Atendente Salvo Com Sucesso!');
    },
    (err) => {
      console.log(err); // Exibe o objeto de erro no console para análise

      if (err.error && err.error.mensagemDeErro) {
        this.toast.error(err.error.mensagemDeErro);
      } else {
        // Lógica para outros casos de erro, se necessário
      }
    }
  );
}

  replica(){
    this.service.replica(this.id_atendente).subscribe((reposta=>{
    this.atendente = reposta;
   }))
  }
 
  cancelar(){
    this.router.navigate(['/atendentes'])
  }
}
