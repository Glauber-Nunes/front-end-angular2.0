import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ConfirmDialogComponent } from '../../ConfirmDialogComponent/ConfirmDialogComponent';

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
    },

    dataCadastro:null
  };


  constructor(private route:ActivatedRoute,private router: Router,
    private clienteService:ClienteService,private toast:ToastrService,
    private dialog: MatDialog
    ) { }

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

  delete(): void {
    this.clienteService.delete(this.id_cliente).subscribe(
      () => {
        this.toast.info('Cliente Excluído Com Sucesso!');
        this.router.navigate(['clientes']);
      },
      (error) => {
        if (error.status === 404) {
          this.toast.warning('Cliente não encontrado.');
        } else {
          this.toast.error('Esse Cliente Possui Ordem De Serviços.');
        }
        console.error('Error deleting client:', error);
      }
    );
  }
  
  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px', // Ajuste a largura conforme necessário
      data: 'Tem certeza que deseja excluir o cliente?', // Passe sua mensagem de confirmação aqui
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // O usuário clicou em "Confirmar" na caixa de diálogo
        this.delete();
      }
    });
  }
  

    
  }


  


