
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  ELEMENT_DATA : Produto[] = [];

  constructor(private service:ProdutoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  displayedColumns: string[] = ['nome','visualizar'];
  dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);
 

  findAll(){
    this.service.findAll().subscribe(resposta =>{
    this.ELEMENT_DATA = resposta;
    this.dataSource = new MatTableDataSource<Produto>(resposta);
    this.dataSource.paginator = this.paginator;
  })
}

@ViewChild(MatPaginator) paginator: MatPaginator;

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
