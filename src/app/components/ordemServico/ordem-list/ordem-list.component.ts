import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdemServico } from 'src/app/model/OrdemServico';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';

@Component({
  selector: 'app-ordem-list',
  templateUrl: './ordem-list.component.html',
  styleUrls: ['./ordem-list.component.css']
})
export class OrdemListComponent implements OnInit {

  ELEMENT_DATA : OrdemServico[] = [];
  FILTERED_DATA : OrdemServico[] = [];

  constructor(private Service:OrdemServicoService) { }

  displayedColumns: string[] = ['id','cliente','status','visualizar','editar','excluir','finalizar'];

  ngOnInit(): void {
    this.findAll();
  }

  dataSource = new MatTableDataSource<OrdemServico>(this.ELEMENT_DATA);

  findAll(){
    this.Service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<OrdemServico>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  getStatusColor(status: string): string {
    if (status === 'ABERTA') {
      return 'green-cell';
    } else if (status === 'ENCERRADA') {
      return 'red-cell';
    }
    return ''; // Retorna uma string vazia caso não haja correspondência
  }


  //
  orderByStatus(status: any): void {
    let list: OrdemServico[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if (element.statusOrdemServico && element.statusOrdemServico === status) {
        list.push(element);
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<OrdemServico>(this.FILTERED_DATA);
    this.dataSource.paginator = this.paginator;
  }
  

}
