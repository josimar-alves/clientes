import { Produto } from '../shared/models/produto';

export interface Item {
    id : Number;
    produto : Produto;
    quantidade : Number;
    valorTotalItem : Number;
}