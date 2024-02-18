import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { ConfirmDialogComponent } from '../../ConfirmDialogComponent/ConfirmDialogComponent';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-produto-view',
  templateUrl: './produto-view.component.html',
  styleUrls: ['./produto-view.component.css']
})
export class ProdutoViewComponent implements OnInit {

  id_produto='';

  produto:Produto = {
    id:null,
    descricao:'',
    preco:0,
    codeBarras:'',
    unEntrada:'',
    unSaida:'',
    estoque:0,
    codigoNcm:''

  }
  constructor(private produtoService:ProdutoService,private route:ActivatedRoute,private router: Router
    ,private toast:ToastrService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.id_produto = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById():void{
    this.produtoService.findById(this.id_produto).subscribe((resposta=>{
    this.produto = resposta;
  }))
}

voltar():void{
  this.router.navigate(['produtos']);
}

openConfirmationDialog(): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px', // Ajuste a largura conforme necessário
    data: 'Tem certeza que deseja excluir o Produto?', // Passe sua mensagem de confirmação aqui
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // O usuário clicou em "Confirmar" na caixa de diálogo
      this.delete();
    }
  });
}

delete(): void {
  this.produtoService.delete(this.id_produto).subscribe(
    () => {
      this.toast.info('Produto Excluído Com Sucesso!');
      this.router.navigate(['produtos']);
    },
  );
}

}
