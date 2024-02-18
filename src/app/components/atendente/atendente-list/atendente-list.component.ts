import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Atendente } from 'src/app/model/Atendente';
import { AtendenteService } from 'src/app/services/atendente.service';

@Component({
  selector: 'app-atendente-list',
  templateUrl: './atendente-list.component.html',
  styleUrls: ['./atendente-list.component.css']
})
export class AtendenteListComponent implements OnInit {

  ELEMENT_DATA : Atendente[] = [];

  constructor(private atendenteService:AtendenteService) { }

  ngOnInit(): void {
    this.findAll();
  }

  displayedColumns: string[] = ['nome','visualizar','editar'];
  dataSource = new MatTableDataSource<Atendente>(this.ELEMENT_DATA);

  findAll(){
      this.atendenteService.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Atendente>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}