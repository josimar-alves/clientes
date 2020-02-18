import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venda } from './venda';
import { tap, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class VendasService {
  
    private readonly API = `http://localhost:8080/venda/getAllTest`;
  
    constructor(private http: HttpClient) { }
  
    list() {
      return this.http.get<Venda[]>(this.API)
        .pipe(
          delay(2000),
          tap(console.log)
        );
    }
  }
  

