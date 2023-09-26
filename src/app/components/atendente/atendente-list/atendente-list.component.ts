import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Atendente } from 'src/app/model/Atendente';

@Component({
  selector: 'app-atendente-list',
  templateUrl: './atendente-list.component.html',
  styleUrls: ['./atendente-list.component.css']
})
export class AtendenteListComponent implements OnInit {

  ELEMENT_DATA: Atendente[] = [
    {
      id: 1,
      nome:'String',
      cpf:'kkkooko',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['id', 'nome', 'cpf','acoes'];
  dataSource = new MatTableDataSource<Atendente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}