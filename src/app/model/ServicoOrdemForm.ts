import { Atendente } from "./Atendente";
import { Cliente } from "./Cliente";
import { Fornecedor } from "./Fornecedor";
import { OrdemServico } from "./OrdemServico";
import { SituacaoOrdem } from "./SituacaoOrdem";
import { statusOrdemServico } from "./StatusOrdemServico";
import { Tecnico } from "./Tecnico";
import { ProdutoOrdem } from "./composicoes.model/ProdutoOrdem";

// servico-ordem-form.interface.ts
export interface ServicoOrdemForm {

    servico: {
      id?: any;
      descricao: string;
      preco: string;
    };
    quantidade: number;
    preco : number;
    subTotalServico:number;
}
  