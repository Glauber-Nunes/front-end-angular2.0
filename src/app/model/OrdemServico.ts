import { Atendente } from "./Atendente";
import { Cliente } from "./Cliente";
import { Fornecedor } from "./Fornecedor";
import { Produto } from "./Produto";
import { Servico } from "./Servico";
import { SituacaoOrdem } from "./SituacaoOrdem";
import { statusOrdemServico } from "./StatusOrdemServico";
import { Tecnico } from "./Tecnico";
import { ProdutoOrdem } from "./composicoes.model/ProdutoOrdem";
import { ServicoOrdem } from "./composicoes.model/ServicoOrdem";

export interface OrdemServico{

    id?:number;
    atendente:{
        id:0,
        nome:''
        cpf:''
    };
    situacaoOrdem:{
        id:0,
        nome:''
    };
    cliente: {
        id: 0,
        nome:'',
        cpf:'',
        rg:'',
        email:'',
        telefone:'',
        endereco:''
    } ;
    tecnico:{
        nome:''
    };
    dataDoServico:Date | null; // Modificação feita aqui,
    dataFechamento:Date | null;
    servicos:Servico[];
    produtos: Produto[],
    observacoes:string;
    statusOrdemServico:{
        id:0,
        nome:''
    };
    valorTotalOrdem:number;
    SubTotalServico:number;
    SubTotalProduto:number;
    protocolo:String;
}