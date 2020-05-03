import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DadosProduto } from './dados-produto';
import { tap, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class VendasService {
    private readonly API = `http://localhost:8080/produto/`;
    constructor(private http: HttpClient) { }
  
    list() {
      return this.http.get<DadosProduto[]>(this.API+"getAll")
        .pipe(
          delay(2000),
          tap()
        );
    }
  }
  

