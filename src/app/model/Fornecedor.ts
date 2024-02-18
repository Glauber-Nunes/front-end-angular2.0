import { Uf } from "./Uf";

export interface Fornecedor{

    id?: any;
    nome:string;
    municipio:String;
    cnpj:String;
    uf:Uf;
}