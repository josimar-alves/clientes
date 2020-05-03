import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DadosVenda } from './dados-venda';
import { tap, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class VendasService {
    private readonly API = `http://localhost:8080/venda/`;
    constructor(private http: HttpClient) { }
  
    list() {
      return this.http.get<DadosVenda[]>(this.API+"getAllPedidos")
        .pipe(
          delay(2000),
          tap()
        );
    }

    listByDate(date) {
      return this.http.get<DadosVenda[]>(this.API+"getAllPedidosWithDate/"+date)
        .pipe(
          delay(2000),
          tap()
        );
    }

    delete(id){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.delete("http://localhost:8080/venda/deleteVenda/"+id, { headers }).toPromise().then((data: any) => {
        console.log("Apagou a veda #" + id);
      });
    }
  }
  

