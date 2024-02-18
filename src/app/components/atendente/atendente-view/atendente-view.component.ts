import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendente } from 'src/app/model/Atendente';
import { AtendenteService } from 'src/app/services/atendente.service';
import { ConfirmDialogComponent } from '../../ConfirmDialogComponent/ConfirmDialogComponent';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-atendente-view',
  templateUrl: './atendente-view.component.html',
  styleUrls: ['./atendente-view.component.css']
})
export class AtendenteViewComponent implements OnInit {


  id_atendente = ''

  atendente : Atendente = {
    id : '',
    nome:'',
    cpf:'',
  }

  constructor(private router:Router,private atendenteService : AtendenteService,
    private route:ActivatedRoute,
    private dialog: MatDialog,private toast:ToastrService) { }

  ngOnInit(): void {
    this.id_atendente = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById():void{
    this.atendenteService.findById(this.id_atendente).subscribe((resposta=>{
    this.atendente = resposta;
  }))
}

fechar(){
  this.router.navigate(['atendentes'])
}

voltar(){
  this.router.navigate(['atendentes'])
}

replica(){
  this.atendenteService.replica(this.id_atendente).subscribe((reposta=>{
  this.atendente = reposta;
 }))
}

delete(): void {
  this.atendenteService.delete(this.id_atendente).subscribe(
    () => {
      this.toast.info('Atendente Excluído Com Sucesso!');
      this.router.navigate(['atendentes']);
    },
    (error) => {
      if (error.status === 404) {
        this.toast.warning('Atendente não encontrado.');
      } else {
        this.toast.error('Erro ao excluir Atendente');
      }
      console.error('Error deleting client:', error);
    }
  );
}

openConfirmationDialog(): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px', // Ajuste a largura conforme necessário
    data: 'Tem certeza que deseja excluir o Atendente?', // Passe sua mensagem de confirmação aqui
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // O usuário clicou em "Confirmar" na caixa de diálogo
      this.delete();
    }
  });
}

}
