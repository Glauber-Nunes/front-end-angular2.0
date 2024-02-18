import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Servico } from 'src/app/model/Servico';
import { ServicoService } from 'src/app/services/servico.service';
import { ConfirmDialogComponent } from '../../ConfirmDialogComponent/ConfirmDialogComponent';

@Component({
  selector: 'app-servico-view',
  templateUrl: './servico-view.component.html',
  styleUrls: ['./servico-view.component.css']
})
export class ServicoViewComponent implements OnInit {

  id_servico='';

  servico:Servico={
    id:null,
    descricao:'',
    preco:0
  }


  constructor(private servicoService:ServicoService,private route:ActivatedRoute,private router: Router
    ,private toast:ToastrService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.id_servico = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  voltar():void{
    this.router.navigate(['servicos']);
  }
  
  findById():void{
    this.servicoService.findById(this.id_servico).subscribe((resposta=>{
    this.servico = resposta;
  }))
}

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px', // Ajuste a largura conforme necessário
      data: 'Tem certeza que deseja excluir Esse Serviço?', // Passe sua mensagem de confirmação aqui
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // O usuário clicou em "Confirmar" na caixa de diálogo
        this.delete();
      }
    });
  }
  
  delete(): void {
    this.servicoService.delete(this.id_servico).subscribe(
      () => {
        this.toast.info('Serviço Excluído Com Sucesso!');
        this.router.navigate(['servicos']);
      },
    );
  }

}
