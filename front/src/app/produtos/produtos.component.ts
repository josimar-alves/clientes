import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './produto.service';
import { Observable, empty, of, Subject, Subscriber } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { DadosProduto } from './dados-produto';
import { element } from 'protractor';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos$: Observable<DadosProduto[]>;
  listProdutos: DadosProduto[];

  listProdutosCol1: DadosProduto[] = [];
  listProdutosCol2: DadosProduto[] = [];
  listProdutosCol3: DadosProduto[] = [];


  error$ = new Subject<boolean>();
  private totalProdutos: number = 0;

  constructor(private service: ProdutoService) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.produtos$ = this.service.list().pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return empty();
      })
    );

    this.service.list()
      .pipe(
        catchError(error => empty())
      )
      .subscribe(
        dados => {
          let i = 0;
          let aux = 0;
          while (i < dados.length) {
            this.listProdutos = dados;
            if (aux === 0) {
              this.listProdutosCol1.push(dados[i]);
              aux = 1;
            } else if (aux === 1){
              this.listProdutosCol2.push(dados[i]);
              aux = 2;
            } else {
              this.listProdutosCol3.push(dados[i]);
              aux = 0;
            }
            i+= 1;
          }
        }
      );
  }

  somar(produto) {
    produto.quantidade += 1;
    this.listProdutos[produto.posicao].quantidade = produto.quantidade;
  }

  subtrair(produto) {
    if (produto.quantidade > 0) {
      produto.quantidade -= 1;
      this.listProdutos[produto.posicao].quantidade = produto.quantidade;
    }
  }

  vender() {
    console.log(this.listProdutos);
  }







}
