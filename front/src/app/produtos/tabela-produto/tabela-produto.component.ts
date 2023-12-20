import { Component, OnInit, Input } from '@angular/core';
import { DadosProduto } from '../dados-produto';
import { TipoDoProduto } from '../enum/tipo-do-produto';

@Component({
  selector: 'app-tabela-produto',
  templateUrl: './tabela-produto.component.html',
  styleUrls: ['./tabela-produto.component.css']
})
export class TabelaProdutoComponent implements OnInit {

  @Input()
  nomeDaTabela: string;

  @Input()
  listaDeProdutos: DadosProduto[];

  tipoDoProduto: any;

  constructor() { }

  ngOnInit() {
    this.tipoDoProduto = TipoDoProduto;
  }

}
