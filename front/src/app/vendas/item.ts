import { Produto } from './produto';

export interface Item {
    id : Number;
    produto : Produto;
    quantidade : Number;
    valorTotalItem : Number;
}