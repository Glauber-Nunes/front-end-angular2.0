import { Cliente } from 'src/app/model/Cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdemServico } from 'src/app/model/OrdemServico';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ordem-list',
  templateUrl: './ordem-list.component.html',
  styleUrls: ['./ordem-list.component.css']
})
export class OrdemListComponent implements OnInit {

  id_ordem =''

  ordem: OrdemServico = {
    id:null,
    atendente: null,
    situacaoOrdem:null,
    cliente:{
      id: 0,
      nome:'',
      cpf:'',
      rg:'',
      email:'',
      telefone:'',
      endereco:''
    },
    tecnico:null,
    dataDoServico:null ,
    dataFechamento: null,
    servicos: [] ,
    produtos: [],
    observacoes:null,
    statusOrdemServico : null,
    valorTotalOrdem:null,
    SubTotalServico:null,
    SubTotalProduto:null,
    protocolo:''
  };

  ELEMENT_DATA : OrdemServico[] = [];
  FILTERED_DATA : OrdemServico[] = [];

  constructor(private Service:OrdemServicoService,
    private router:Router,private toast :ToastrService,private route:ActivatedRoute) { }

  displayedColumns: string[] = ['id','cliente','status','visualizar','editar','excluir'];

  ngOnInit(): void {
    this.id_ordem = this.route.snapshot.paramMap.get('id')!
    this.findAll();
   
  }

  dataSource = new MatTableDataSource<OrdemServico>(this.ELEMENT_DATA);

  findAll(){
      this.Service.findAll().subscribe(resposta =>{
      console.log(resposta); // Log the response to the console
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
      if (element.statusOrdemServico.id && element.statusOrdemServico.id === status) {
        list.push(element);
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<OrdemServico>(this.FILTERED_DATA);
    this.dataSource.paginator = this.paginator;
  }

  finalizaServico():void{
    this.Service.finalizaServico(this.ordem).subscribe((resposta=>{
    this.router.navigate(['/ordem-servicos']);
    this.toast.info('OS Salvo Com Sucesso!');
    }))
  }

  findById():void{
    this.Service.findById(this.id_ordem).subscribe((resposta=>{
      this.ordem = resposta;
    }))
  }
}
