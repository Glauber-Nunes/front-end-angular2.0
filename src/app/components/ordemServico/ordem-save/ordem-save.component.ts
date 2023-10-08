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
    tecnico:null,
    dataDoServico:null ,
    dataFechamento: null,
    servicos: [] ,
    produtos: [],
    fornecedor: null,
    observacoes:null,
    statusOrdemServico : null,
    valorTotalOrdem:null,
  };

  servicosSelecionados: ServicoOrdem[] = [];
  produtosSelecionados: ProdutoOrdem [] = [];

  selectedServicoId: number[] = []; // Initialize as an empty array
  selectedProdutoId: number[] = [];

  onServicoSelectionChange(event: any) {
    // Obtém os IDs dos serviços selecionados a partir do evento
    const selectedServicoIds = event.value;
  
    // Inicializa a lista de serviços selecionados como vazia
    this.servicosSelecionados = [];
  
    // Verifica se há serviços selecionados
    if (selectedServicoIds) {
        // Itera sobre os IDs dos serviços selecionados
        for (const servicoId of selectedServicoIds) {
            // Encontra o serviço correspondente pelo ID na lista de serviços (this.servs)
            const servico = this.servs.find((s) => s.id === servicoId);
            
            // Obtém a quantidade selecionada para este serviço
            const quantidade = this.selectedServicoId[servicoId];
            
            // Calcula o subTotalServico com base na quantidade e preço do serviço
            const subTotalServico = quantidade * servico.preco;
            
            // Inicializa um novo objeto ServicoOrdem com o serviço encontrado e outras propriedades
            const novoServico: ServicoOrdem = {
                servico_id: servico.id,
                quantidade: quantidade,
                preco: servico.preco,
                subTotalServico: subTotalServico
            };
            
            // Adicione o novo serviço à lista de serviços selecionados
            this.servicosSelecionados.push(novoServico);
        }
    }
}


onProdutoSelectionChange(event: any) {

    const selectedProdutoIds = event.value;

    this.produtosSelecionados = [];

    if (selectedProdutoIds) {
      // Itera sobre os IDs dos serviços selecionados
      for (const produtoId of selectedProdutoIds) {
          // Encontra o serviço correspondente pelo ID na lista de serviços (this.servs)
          const produto = this.prods.find((p) => p.id === produtoId);
          
          // Obtém a quantidade selecionada para este serviço
          const quantidade = this.selectedProdutoId[produtoId];
          
          // Calcula o subTotalServico com base na quantidade e preço do serviço
          const subTotalProduto = quantidade * produto.preco;
          
          // Inicializa um novo objeto ServicoOrdem com o serviço encontrado e outras propriedades
          const novoProduto: ProdutoOrdem = {
              produto_id: produto.id,
              quantidade: quantidade,
              preco: produto.preco,
              subTotalProduto: subTotalProduto
          };
          
          // Adicione o novo serviço à lista de serviços selecionados
          this.produtosSelecionados.push(novoProduto);
      }
  }
}

  calculateTotal() {
    // Reset total value before recalculating
    this.ordem.valorTotalOrdem = 0;
  
    // Sum the values of selected services
    for (const servicoSelecionado of this.ordem.servicos) {
      this.ordem.valorTotalOrdem += servicoSelecionado.preco * servicoSelecionado.quantidade ;
    }
  
    // Sum the values of selected products
    for (const produtoSelecionado of this.ordem.produtos) {
      this.ordem.valorTotalOrdem += produtoSelecionado.preco * produtoSelecionado.quantidade ;
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
        this.toast.info('OS Salva Com Sucesso!');
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

 
  ngOnChanges(changes: SimpleChanges): void {
    // Verifica se houve mudanças na propriedade ordem.produtos
    if (changes['ordem'] && changes['ordem'].currentValue) {
      // Chama o método calculateTotal() sempre que houver mudanças em ordem.produtos
      this.calculateTotal();
    }
  }
  
}
