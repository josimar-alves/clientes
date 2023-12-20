import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './services/produtos.service';
import { empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoDoProduto } from './enum/tipo-do-produto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  dados = {
    listHamburguer: [],
    listShakes: [],
    listBebidas: [],
    listOutros: []
  };

  constructor(
    private service: ProdutoService,
    private http: HttpClient,
  ) { }

  ngOnInit() {

    this.carregarListaDeProdutos();
  }

  carregarListaDeProdutos() {
    this.service.getAll().pipe().subscribe(dados => {
      for (const produto of dados) {
        if (produto.tipo == TipoDoProduto.HAMBURGUER) {
          this.dados.listHamburguer.push(produto);
        } else if (produto.tipo == TipoDoProduto.SHAKE) {
          this.dados.listShakes.push(produto);
        } else if (produto.tipo == TipoDoProduto.BEBIDA) {
          this.dados.listBebidas.push(produto);
        } else if (produto.tipo == TipoDoProduto.OUTROS) {
          this.dados.listOutros.push(produto);
        }
      }
    });
    this.dados.listHamburguer.sort((a, b) => a.posicao - b.posicao);
    this.dados.listShakes.sort((a, b) => a.posicao - b.posicao);
    this.dados.listBebidas.sort((a, b) => a.posicao - b.posicao);
    this.dados.listOutros.sort((a, b) => a.posicao - b.posicao);
  }

  salvarModificao() {
    if (confirm("Salvar Modificação")) {
      const arrayProdutos = [].concat(...Object.values(this.dados));
      this.service.salvarModificao(arrayProdutos).toPromise().then(() => {
        alert('Modificado com sucesso');
      });
    } else {
      alert('Modificação não realizada');
    }
  }
}
