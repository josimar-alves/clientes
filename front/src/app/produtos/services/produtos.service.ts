import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DadosProduto } from '../dados-produto';
import { tap, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class ProdutoService {
    private readonly API = `http://localhost:8080/produto/`;

    constructor(private http: HttpClient) { }
  
    getAll() {
      return this.http.get<DadosProduto[]>(this.API+"getAll");
    }

    salvarModificao(body) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(this.API+"modifyAll", body, { headers });
    }
  }
  

