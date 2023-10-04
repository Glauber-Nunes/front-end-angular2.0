import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-save',
  templateUrl: './cliente-save.component.html',
  styleUrls: ['./cliente-save.component.css']
})
export class ClienteSaveComponent implements OnInit {

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
    }
  };

  constructor(private toast:ToastrService,private router:Router,private service : ClienteService) { }


  ngOnInit(): void {
  }


  cancelar(){
    this.router.navigate(['clientes'])
  }


  save():void{
    this.service.save(this.cliente).subscribe((resposta)=>{
    this.router.navigate(['/clientes'])
    this.toast.info('Cliente Salvo Com Sucesso!');
    }, err =>{
      if(err.error.error.match('Ja Cadastrado')){
        this.toast.error(err.error.error)
        console.log(err)
      }else{
       
      }
    })
  }

}
