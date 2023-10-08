import { Endereco } from "./Endereco";
import { Telefone } from "./Telefone";

export interface Cliente{
    id?: any;
    nome:string;
    cpf:string;
    rg:string;
    email:string;
    
    telefone:Telefone;
    endereco:Endereco;
    dataCadastro:Date | null;
}