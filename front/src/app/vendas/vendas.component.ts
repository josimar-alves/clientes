import { Component, OnInit } from '@angular/core';
import { VendasService } from './venda.service';
import { DadosVenda } from './dados-venda';
import { Observable, empty, of, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

  vendas$: Observable<DadosVenda[]>;
  error$ = new Subject<boolean>();

  constructor(private service: VendasService) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.vendas$ = this.service.list()
    .pipe(
      // map(),
      // tap(),
      // switchMap(),
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
      console.log(dados);
    }
  );
}

printVenda(id) {
  console.log("Imprimiu!");
}

deleteVenda(id) {
  this.service.delete(id);
  this.onRefresh();
}

}
