import { Cliente } from './cliente';

export interface DadosVenda {
    id : Number;
    cliente : Cliente;
    data : Date;
    obs : String;
}