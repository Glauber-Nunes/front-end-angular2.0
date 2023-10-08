import { Servico } from 'src/app/model/Servico';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemServico } from 'src/app/model/OrdemServico';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';   
import { ServicoService } from 'src/app/services/servico.service';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-ordem-view',
  templateUrl: './ordem-view.component.html',
  styleUrls: ['./ordem-view.component.css']
})
export class OrdemViewComponent implements OnInit {


  id_ordem = ''

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
    descricao:null,
    tecnico: null,
    dataDoServico: null ,// Modificação feita aqui,
    dataFechamento: null,
    servicos:[],
    produtos: [],
    fornecedor: null,
    observacoes:'',
    statusOrdemServico : null,
    valorTotalOrdem:null,
  };

  atendente: any; // Vai conter os dados do atendente
  cliente: any;   // Vai conter os dados do cliente



  constructor(private route:ActivatedRoute,private router: Router,
    private Service:OrdemServicoService, 
    private servicoService:ServicoService,
    private produtoService: ProdutoService) { }

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

  getStatusClass(status: string): string {
    return status === 'ABERTA' ? 'status-aberta' : 'status-encerrada';
  }
  
  voltar(){
    this.router.navigate(['ordem-servicos'])
  }
}
