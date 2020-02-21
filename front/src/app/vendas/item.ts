import { Produto } from '../produtos/produto';

export interface Item {
    id : Number;
    produto : Produto;
    quantidade : Number;
    valorTotalItem : Number;
}