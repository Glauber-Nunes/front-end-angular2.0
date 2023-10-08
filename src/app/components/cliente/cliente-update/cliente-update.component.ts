import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  id_cliente = ''

  cliente: Cliente = {
    id: null,
    nome: '',
    cpf: '',
    rg: '',
    email: '',
    telefone: {
      dd: '',
      numero: ''
    },
    endereco: {
      rua:'',
      numero:'',
      complemento:'',
      bairro:'',
      cidade:'',
      estado:'',
      cep:'',
      pais:'',
    },

    dataCadastro:null
  };

  constructor(private toast:ToastrService,private router:Router,private service : ClienteService,
    private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.id_cliente = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }


  cancelar(){
    this.router.navigate(['clientes'])
  }

  
  findById():void{
    this.service.findById(this.id_cliente).subscribe((resposta=>{
      this.cliente = resposta;
    }))
  }


  update():void{
    this.service.update(this.cliente).subscribe((resposta=>{
    this.router.navigate(['clientes'])
    this.toast.info('Cliente Atualizado Com Sucesso!');
  }), err =>{
    if(err.error.error.match('Ja Cadastrado')){
      this.toast.error(err.error.error)
      console.log(err)
    }else{
     
    }
  })
}

}
