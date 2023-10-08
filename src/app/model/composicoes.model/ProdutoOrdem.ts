import { OrdemServico } from "../OrdemServico";
import { Produto } from "../Produto";

export interface ProdutoOrdem {

  produto_id:Produto;

  quantidade: number;
  preco: number;
  subTotalProduto: number;

}