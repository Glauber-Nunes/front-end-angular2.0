import { Servico } from 'src/app/model/Servico';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemServico } from 'src/app/model/OrdemServico';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';   
import { ServicoService } from 'src/app/services/servico.service';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../ConfirmDialogComponent/ConfirmDialogComponent';



@Component({
  selector: 'app-ordem-view',
  templateUrl: './ordem-view.component.html',
  styleUrls: ['./ordem-view.component.css']
})
export class OrdemViewComponent implements OnInit {

  ELEMENT_DATA : OrdemServico[] = [];
  displayedColumns: string[] = ['produto','preco'];
  dataSource = new MatTableDataSource<OrdemServico>(this.ELEMENT_DATA);

  id_ordem = ''
  isServiceLoading = false;

  servs: Servico[] = [];
  prods: Produto[] = [];

  listServicos():void{
    this.servicoService.findAll().subscribe((resposta=>{
    this.servs = resposta;
  }))
}

listProdutos():void{
  this.produtoService.findAll().subscribe((resposta=>{
    this.prods = resposta;
  }))
}

@ViewChild(MatPaginator) paginator: MatPaginator;

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}


  ordem: OrdemServico = {
    id:null,
    atendente: {
      id:0,
      nome:'',
      cpf:''
    },
    situacaoOrdem:{
      id:0,
      nome:''

    },
    
    cliente:{
      id: 0,
      nome:'',
      cpf:'',
      rg:'',
      email:'',
      telefone:'',
      endereco:''
    },
   
    tecnico: null,
    dataDoServico: null ,// Modificação feita aqui,
    dataFechamento: null,
    servicos:[
    {
      id:0,
      descricao:'',
      preco:''
    }
    ],
    produtos: [
      {
        id:0,
        descricao:'',
        preco:0,
        codeBarras:'',
        unEntrada:'',
        unSaida:'',
        estoque:0,
        codigoNcm:''
      }
    ],

    observacoes:'',
    statusOrdemServico : null,
    valorTotalOrdem:null,
    SubTotalServico:null,
    SubTotalProduto:null,
    protocolo:''
  };

  atendente: any; // Vai conter os dados do atendente
  cliente: any;   // Vai conter os dados do cliente



  constructor(private route:ActivatedRoute,private router: Router,
    private Service:OrdemServicoService, 
    private servicoService:ServicoService,
    private produtoService: ProdutoService,
    private toast:ToastrService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.id_ordem = this.route.snapshot.paramMap.get('id')!
    this.findById();
    this.listServicos();
    this.listProdutos();
  }

    fechar(){
      this.router.navigate(['ordem-servicos'])
    }

    findById():void{
        this.Service.findById(this.id_ordem).subscribe((resposta=>{
        this.ordem = resposta;
      }))
    }

    finalizaServico():void{
      this.isServiceLoading = true;
      this.Service.finalizaServico(this.ordem).subscribe((resposta=>{
      this.isServiceLoading = false;
      this.router.navigate(['ordem-servicos'])
      this.toast.info('OS Finalizada Com Sucesso!');
      } ),err =>{
        if(err.error.error.match('ORDEM DE SERVIÇO JA ESTA ENCERRADA')){
          this.toast.error(err.error.error)
          console.log(err)
        }else{
         
        }
      })
    }

    getStatusClass(status: string): string {
      return status === 'ABERTA' ? 'status-aberta' : 'status-encerrada';
    }
  
    voltar(){
      this.router.navigate(['ordem-servicos'])
    }

    replica(){
      this.router.navigate(['saveOrdemServico'])
    }

    openConfirmationDialogFinalizaOs(): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '300px', // Ajuste a largura conforme necessário
        data: 'deseja Finalizar a Ordem De Serviço?', // Passe sua mensagem de confirmação aqui
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // O usuário clicou em "Confirmar" na caixa de diálogo
          this.finalizaServico();
        }
      });
    }
    
}
