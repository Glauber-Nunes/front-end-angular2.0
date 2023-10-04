import { Component, OnInit } from '@angular/core';
import { Atendente } from 'src/app/model/Atendente';
import { Cliente } from 'src/app/model/Cliente';
import { OrdemServico } from 'src/app/model/OrdemServico';
import { Servico } from 'src/app/model/Servico';
import { SituacaoOrdem } from 'src/app/model/SituacaoOrdem';
import { Tecnico } from 'src/app/model/Tecnico';
import { AtendenteService } from 'src/app/services/atendente.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';
import { ServicoService } from 'src/app/services/servico.service';
import { SituacaoService } from 'src/app/services/situacao.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ServicoOrdemForm } from 'src/app/model/ServicoOrdemForm';
import { ProdutoOrdem } from 'src/app/model/composicoes.model/ProdutoOrdem';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ordem-save',
  templateUrl: './ordem-save.component.html',
  styleUrls: ['./ordem-save.component.css']
})
export class OrdemSaveComponent implements OnInit {

  constructor(private service : OrdemServicoService, private atenService: AtendenteService
    , private situacaoService : SituacaoService,private clienteService : ClienteService,
    private tecnicoService: TecnicoService,private servicoService : ServicoService,
    private produtoService:ProdutoService,private fornecedorService: FornecedorService,
    private toast:ToastrService,private router:Router) { }

    id_ordem = ''

    atendentes: Atendente[] = [];
    situacoes: SituacaoOrdem [] = [];
    clientes: Cliente [] = [];
    tecnicos: Tecnico [] =[];
    servs: Servico[] = [];
    prods : Produto [] = [];
    fornecedores: Fornecedor[] =[];

  ngOnInit(): void {
    this.listAtendente();
    this.listSituacoes();
    this.listClientes();
    this.listTecnicos();
    this.listServicos();
    this. listProdutos();
    this.listFornecedor();
    this.selectedServicoId = []; // or initialize with appropriate data
    this.selectedProdutoId = [];
  }


  ordem: OrdemServico = {
    id:null,
    atendente: null,
    situacaoOrdem:null,
    cliente:null,
    descricao:null,
    tecnico:null,
    dataDoServico:null ,
    dataFechamento: null,
    servicos: [
      
    ] ,
    produtos: [
      
        
    ],
    fornecedor: null,
    observacoes:null,
    statusOrdemServico : null,
    valorTotalOrdem:null,
  };

  servicosSelecionados: ServicoOrdemForm[] = [];
  produtosSelecionados: ProdutoOrdem [] = [];

  selectedServicoId: number[] = []; // Initialize as an empty array
  selectedProdutoId: number[] = [];

  
  onServicoSelectionChange(event: any) {
    const selectedServicoIds = event.value;
  
    // Limpe a lista de serviços selecionados
   // this.servicosSelecionados = [];
  
    if (selectedServicoIds && this.servs) {
      for (const servicoId of selectedServicoIds) {
        // Encontre o serviço com base no ID
        const servico = this.servs.find((s) => s.id === servicoId);
  
        if (servico) {
          // Certifique-se de que o serviço foi encontrado
          // Inicialize a quantidade como 1 por padrão
          const novoServico: ServicoOrdemForm = {
            servico: servico.id,
            quantidade: 1,
            preco: servico.preco ? servico.preco : 0,
            subTotalServico: 0,
          };
  
          // Adicione o novo serviço à lista de serviços selecionados
          this.ordem.servicos.push(novoServico);
        
        }
      }
    }
  }
  
  
  onProdutoSelectionChange(event: any){
    // Obtém os IDs dos produtos selecionados a partir do evento
    const selectedProdutoIds = event.value;

     // Inicializa a lista de produtos selecionados como vazia
   // this.produtosSelecionados = [];

     // Verifica se há produtos selecionados
    if(selectedProdutoIds){
        // Itera sobre os IDs dos produtos selecionados
      for (const produtoId of selectedProdutoIds) {
        // Encontra o produto correspondente pelo ID na lista de produtos (this.prods)
        const produto = this.prods.find((p)=> p.id === produtoId);
       
          // Inicializa um novo objeto ProdutoOrdem com o produto encontrado e outras propriedades
        const novoProduto: ProdutoOrdem = {
          produto: produto.id,
          quantidade: 1,
          preco :produto.preco,
          subTotalProduto:0,
         
        };
        // Adicione o novo serviço à lista de serviços selecionados
        this.ordem.produtos.push(novoProduto);
     
      }
    }
  }

 
  listFornecedor():void{
      this.fornecedorService.findAll().subscribe((resposta=>{
      this.fornecedores = resposta;
    }))
  }

  listAtendente():void{
      this.atenService.findAll().subscribe((resposta=>{
      this.atendentes = resposta;
    }))
  }

  listSituacoes():void{
    this.situacaoService.findAll().subscribe((resposta=>{
    this.situacoes = resposta;
    }))
  }

  listClientes():void{
    this.clienteService.findAll().subscribe((resposta=>{
    this.clientes =resposta;
    }))
  }

  listTecnicos():void{
    this.tecnicoService.findAll().subscribe((resposta=>{
    this.tecnicos = resposta;
    }))
  }

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


 
  save(): void {
    
    console.log('Dados a serem enviados:', this.ordem);
    this.service.save(this.ordem).subscribe(
      (resposta) => {
        this.router.navigate(['/ordem-servicos'])
        this.toast.info('OS Salvo Com Sucesso!');
        console.log('Produtos Selecionados:', this.produtosSelecionados);
      },
      (err) => {
        if (err.error.error.match('Ja Cadastrado')) {
          this.toast.error(err.error.error)
          console.log(err)
        } else {
          // Lógica de tratamento de outros erros, se necessário
        }
      }
    );
  }



  
}
