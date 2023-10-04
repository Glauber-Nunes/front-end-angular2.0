import { Atendente } from "./Atendente";
import { Cliente } from "./Cliente";
import { Fornecedor } from "./Fornecedor";
import { Produto } from "./Produto";
import { Servico } from "./Servico";
import { ServicoOrdemForm } from "./ServicoOrdemForm";
import { SituacaoOrdem } from "./SituacaoOrdem";
import { statusOrdemServico } from "./StatusOrdemServico";
import { Tecnico } from "./Tecnico";
import { ProdutoOrdem } from "./composicoes.model/ProdutoOrdem";
import { ServicoOrdem } from "./composicoes.model/ServicoOrdem";

export interface OrdemServico{

    id?:number;
    atendente:number;
    situacaoOrdem:number;
    cliente: {
        id: 0,
        nome:'',
        cpf:'',
        rg:'',
        email:'',
        telefone:'',
        endereco:''
    } ;
    descricao:string;
    tecnico:number;
    dataDoServico:Date | null; // Modificação feita aqui,
    dataFechamento:Date | null;
    servicos:ServicoOrdem[];
    produtos:ProdutoOrdem[];
    fornecedor:number;
    observacoes:string;
    statusOrdemServico:number;
    valorTotalOrdem:number;
}