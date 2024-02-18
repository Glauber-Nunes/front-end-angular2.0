import { createViewChild } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css']
})
export class FornecedorListComponent implements OnInit {

  ELEMENT_DATA : Fornecedor[] = [];

  displayedColumns: string[] = ['nome','visualizar'];
  dataSource = new MatTableDataSource<Fornecedor>(this.ELEMENT_DATA);



  constructor(private fornecedorService:FornecedorService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.fornecedorService.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Fornecedor>(resposta);
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

}
