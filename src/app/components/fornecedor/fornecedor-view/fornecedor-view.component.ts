import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { ConfirmDialogComponent } from '../../ConfirmDialogComponent/ConfirmDialogComponent';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-fornecedor-view',
  templateUrl: './fornecedor-view.component.html',
  styleUrls: ['./fornecedor-view.component.css']
})
export class FornecedorViewComponent implements OnInit {

  id_forne = ''

  fornecedor : Fornecedor = {
    id: '',
    nome:'',
    municipio:'',
    cnpj: '',
    uf:{
      id:0,
      uf:''
    }
  }

  

  constructor(private route:ActivatedRoute,private router: Router,
    private fornecedorService:FornecedorService,private toast:ToastrService, private dialog: MatDialog) { }

    ngOnInit(): void {
      this.id_forne  = this.route.snapshot.paramMap.get('id')!
      this.findById();
    }
  
    voltar(){
      this.router.navigate(['fornecedores'])
    }
  
    findById():void{
      this.fornecedorService.findById(this.id_forne).subscribe((resposta=>{
        this.fornecedor = resposta;
      }))
    }

    delete():void{
      this.fornecedorService.delete(this.id_forne).subscribe((respost=>{
        this.toast.info('Fornecedor Excluído Com Sucesso!');
        this.router.navigate(['fornecedores']);
      }))
    }

    openConfirmationDialog(): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '300px', // Ajuste a largura conforme necessário
        data: 'Tem certeza que deseja excluir o Fornecedor?', // Passe sua mensagem de confirmação aqui
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // O usuário clicou em "Confirmar" na caixa de diálogo
          this.delete();
        }
      });
    }

}
