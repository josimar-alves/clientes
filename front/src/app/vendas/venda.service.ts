import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class VendasService {
    constructor(private http: HttpClient) {}
        url = '';
        getCharacters() {return this.http.get('http://localhost:8080/venda/getAll')};
}