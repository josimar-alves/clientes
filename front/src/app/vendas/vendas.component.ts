import { Component, OnInit } from '@angular/core';
import { VendasService } from './venda.service';
import { DadosVenda } from './dados-venda';
import { Observable, empty, of, Subject, Subscriber } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Input } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

  vendas$: Observable<DadosVenda[]>;
  error$ = new Subject<boolean>();
  private totalVendas: number = 0;
  pag : Number = 1 ;
  contador : Number = 50;

  constructor(private service: VendasService, private router: Router) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.vendas$ = this.service.list().pipe(
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
        }
      );
      this.setTotal();
  }

  printVenda(id) {
    console.log("Imprimiu!!");
  }

  deleteVenda(id) {
    this.service.delete(id);
    this.onRefresh();
  }

  getTotal() {
    return this.totalVendas.toFixed(2);
  }

  setTotal() {
    var filterButton = <HTMLInputElement> document.getElementById("dateFilterButton");
    var refreshButton = <HTMLInputElement> document.getElementById("refreshButton");
    filterButton.disabled = true;
    refreshButton.disabled = true;

    this.totalVendas = 0;
    this.vendas$.subscribe(val => {
      var x= 0;
      if (val.length == 0) {
        filterButton.disabled = false;
        refreshButton.disabled = false;
      } else {
        while(x < val.length) {
          this.totalVendas += Number(val[x].total);
          x += 1;
          if (x === val.length) {
            filterButton.disabled = false;
            refreshButton.disabled = false;
          }
        }
      }
    });
  }

  filterByDate(date) {
    if (date === null || date === "") {
      this.onRefresh();
    } else {
      this.vendas$ = this.service.listByDate(date).pipe(
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          return empty();
        })
      );

      this.service.listByDate(date).pipe(
        catchError(error => empty())
      ).subscribe(
        dados => {
        }
      );
      this.setTotal();
     }
  }

  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  editarVenda(id){
    this.router.navigate(['/templateForm'], { queryParams: { venda: id } });
  }
}
