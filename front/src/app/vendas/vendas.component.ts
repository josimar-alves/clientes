import { Component, OnInit } from '@angular/core';
import { VendasService } from './venda.service';
import { Venda } from './venda';
import { Observable, empty, of, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

  vendas$: Observable<Venda[]>;
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

}
