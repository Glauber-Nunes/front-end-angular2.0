import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Servico } from 'src/app/model/Servico';
import { Tecnico } from 'src/app/model/Tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ConfirmDialogComponent } from '../../ConfirmDialogComponent/ConfirmDialogComponent';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  id_tecnico='';

  tecnico:Tecnico={
    id:null,
    nome:''
  }

  ELEMENT_DATA : Tecnico[] = [];

  constructor(private dialog: MatDialog,private service:TecnicoService,private toast:ToastrService,private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.findAll();
  
  }

  findById():void{
    this.service.findById(this.id_tecnico).subscribe((resposta=>{
    this.tecnico = resposta;
  }))
}

  displayedColumns: string[] = ['numero','nome','excluir'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  findAll(){
    this.service.findAll().subscribe(resposta =>{
    this.ELEMENT_DATA = resposta;
    this.dataSource = new MatTableDataSource<Tecnico>(resposta);
    this.dataSource.paginator = this.paginator;
  })
}

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

delete(id:number): void {
  this.service.delete(id).subscribe(
    () => {
      this.toast.info('Tecnico Excluído Com Sucesso!');
      this.router.navigate(['tecnicos']);
    },
  );
}

openConfirmationDialog(id:number): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px', // Ajuste a largura conforme necessário
    data: 'deseja excluir Esse Tecnico?', // Passe sua mensagem de confirmação aqui
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // O usuário clicou em "Confirmar" na caixa de diálogo
     this.delete(id);
    }
  });
}


}
