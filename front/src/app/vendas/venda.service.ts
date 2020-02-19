import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DadosVenda } from './dados-venda';
import { tap, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class VendasService {
  
    private readonly API = `http://localhost:8080/venda/getAllPedidos`;
  
    constructor(private http: HttpClient) { }
  
    list() {
      return this.http.get<DadosVenda[]>(this.API)
        .pipe(
          delay(2000),
          tap(console.log)
        );
    }
  }
  

