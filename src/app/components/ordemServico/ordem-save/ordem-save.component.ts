import { Component, OnInit, SimpleChanges } from '@angular/core';
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
import { ProdutoOrdem } from 'src/app/model/composicoes.model/ProdutoOrdem';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ServicoOrdem } from 'src/app/model/composicoes.model/ServicoOrdem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-ordem-save',
  templateUrl: './ordem-save.component.html',
  styleUrls: ['./ordem-save.component.css']
})
export class OrdemSaveComponent implements OnInit {

  isServiceLoading = false;

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

  servicosSelecionados: Servico[] = [];
  produtosSelecionados: Produto [] = [];

  selectedServicoId: number[] = []; // Initialize as an empty array
  selectedProdutoId: number[] = [];


  onServicoSelectionChange(event: MatSelectChange): void {
    // Obtém os serviços selecionados a partir do evento
    const selectedServicoIds = event.value;

    // Inicializa a lista de serviços selecionados como vazia
       //this.servicosSelecionados = [];
       this.ordem.servicos = [];

        // Inicializa o valor total
        this.ordem.SubTotalServico = 0;


    // Verifica se há serviços selecionados
    if (selectedServicoIds) {
        // Itera sobre os serviços selecionados
        console.log('Serviços selecionados:', this.selectedServicoId);
        for (const servicoId of selectedServicoIds) {
           // Encontra o servico correspondente pelo ID na lista de produtos (this.servs)
           // const servico = this.servs.find((s)=> s.id === servicoId )

            // Inicializar um novo objeto Servico
            const novoServico: Servico= {
              id: servicoId,
              descricao:servicoId.descricao,
              preco:servicoId.preco
            };

            //this.servicosSelecionados.push(novoServico)
            this.ordem.servicos.push(novoServico.id)

            this.calcularSubTotalServicos();
        }

        
    } 
}

        calcularSubTotalServicos(): number {
          // Inicializa o valor total
          this.ordem.SubTotalServico = 0;
         
          // Itera sobre os serviços da ordem e soma os preços
          for (const servico of this.ordem.servicos) {
              this.ordem.SubTotalServico += servico.preco;
           
          }

          return  this.ordem.SubTotalServico;
        }

        calcularSubTotalProdutos(): number {
          // Inicializa o valor total
          this.ordem.SubTotalProduto = 0;
         
          // Itera sobre os serviços da ordem e soma os preços
          for (const produto of this.ordem.produtos) {
              this.ordem.SubTotalProduto += produto.preco;
           
          }

          return  this.ordem.SubTotalProduto;
        }

       // Função para calcular o valor total da ordem
        calcularValorTotalOrdem(): number {
          // Calcula os subtotais de produtos e serviços
          const subTotalProdutos = this.calcularSubTotalProdutos();
          const subTotalServicos = this.calcularSubTotalServicos();

          // Soma os subtotais para obter o valor total da ordem
          return this.ordem.valorTotalOrdem = subTotalProdutos + subTotalServicos;
        }


  
      onProdutoSelectionChange(event: MatSelectChange): void {
        // Obtém os produtos selecionados a partir do evento
        const selectedProdutoIds = event.value;

          // Inicializa a lista de produtos selecionados como vazia
           // this.produtosSelecionados = [];
           this.ordem.produtos = [];

          
            // Inicializa o valor total
           this.ordem.SubTotalProduto = 0;
      
      
        // Verifica se há produtos selecionados
        if (selectedProdutoIds) {
            // Itera sobre os produtos selecionados
            console.log('Produtos selecionados:', this.selectedProdutoId);
            for (const produtoId of selectedProdutoIds) {
              // Encontra o produto correspondente pelo ID na lista de produtos (this.prods)
              //  const produto = this.prods.find((p)=> p.id === produtoId);

               const novoProduto: Produto={
                id:produtoId,
                codeBarras:produtoId.codeBarras,
                descricao:produtoId.descricao,
                estoque:produtoId.estoque,
                preco:produtoId.preco,
                unEntrada:produtoId.unEntrada,
                unSaida:produtoId.unSaida,
                codigoNcm:produtoId.codigoNcm
               }
                
                // Adicione o produto à lista de produtos selecionados
                //this.produtosSelecionados.push(novoProduto);
                this.ordem.produtos.push(novoProduto.id);
                 // Atualiza o valor total
                this.ordem.SubTotalProduto += novoProduto.preco;
                console.log('lista produto:', this.ordem.produtos);

                this.calcularSubTotalProdutos();
            }

           
              
        }
      }

  
  formularioServico: FormGroup;
  formularioProduto: FormGroup;

  listaServicosOrdem: ServicoOrdem[] = [];
  listaProdutoOrdem: ProdutoOrdem[] = [];

  constructor(private service : OrdemServicoService, private atenService: AtendenteService
    , private situacaoService : SituacaoService,private clienteService : ClienteService,
      private tecnicoService: TecnicoService,private servicoService : ServicoService,
      private produtoService:ProdutoService,private fornecedorService: FornecedorService,
      private toast:ToastrService,private router:Router,private fb: FormBuilder) {
     }

   
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
    this.listProdutos();
    this.listFornecedor();
    this.selectedServicoId = []; // or initialize with appropriate data
    this.selectedProdutoId = [];
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
    this.isServiceLoading = true;
    this.service.save(this.ordem).subscribe(
      (resposta) => {
        this.isServiceLoading = false;
        this.router.navigate(['/ordem-servicos'])
        this.toast.info('OS Salva Com Sucesso!');
        console.log('Produtos Selecionados:', this.produtosSelecionados);
      },
      (err) => {
        this.isServiceLoading = false;
        if (err.error.error.match('Ja Cadastrado')) {
          this.toast.error(err.error.error)
          console.log(err)
        } else {
          // Lógica de tratamento de outros erros, se necessário
        }
      }
    );
  }

  cancelar(){  
    this.router.navigate(['ordem-servicos'])
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   
  }
  
}
