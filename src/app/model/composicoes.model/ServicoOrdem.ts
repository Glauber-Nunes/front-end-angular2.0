import { OrdemServico } from "../OrdemServico";
import { Produto } from "../Produto";

import { Servico } from "../Servico";

export interface ServicoOrdem {
 
  servico_id:Servico;

  quantidade: number;
  preco: number;
  subTotalServico: number;

}
  