import { Item } from './item';

export interface Venda {
    items : Item[];
    id : Number;
    nome : String;
}