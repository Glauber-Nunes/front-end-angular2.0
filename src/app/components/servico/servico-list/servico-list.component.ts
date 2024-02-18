import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Servico } from 'src/app/model/Servico';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css']
})
export class ServicoListComponent implements OnInit {

  ELEMENT_DATA : Servico[] = [];

  constructor(private service:ServicoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  displayedColumns: string[] = ['numero','descricao','visualizar'];
  dataSource = new MatTableDataSource<Servico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  findAll(){
    this.service.findAll().subscribe(resposta =>{
    this.ELEMENT_DATA = resposta;
    this.dataSource = new MatTableDataSource<Servico>(resposta);
    this.dataSource.paginator = this.paginator;
  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
