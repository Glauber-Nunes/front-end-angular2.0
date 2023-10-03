import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-view',
  templateUrl: './cliente-view.component.html',
  styleUrls: ['./cliente-view.component.css']
})
export class ClienteViewComponent implements OnInit {

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
    }
  };


  constructor(private route:ActivatedRoute,private router: Router,
    private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.id_cliente = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  fechar(){
    this.router.navigate(['clientes'])
  }

  findById():void{
    this.clienteService.findById(this.id_cliente).subscribe((resposta=>{
      this.cliente = resposta;
    }))
  }
  
  voltar(){
    this.router.navigate(['clientes'])
  }

}
