import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import { DadosProduto } from '../../produtos/dados-produto';

@Injectable()
export class DropdownService {
  cliente: Cliente = new Cliente();

  constructor(private http: HttpClient) {}

  getProdutos() {
    return this.http.get<DadosProduto[]>('http://localhost:8080/produto/getAll')
  }

  getClientes() {
    return this.http.get<Cliente[]>('http://localhost:8080/cliente/getAll');
  }

  addCliente(cliente: Object) {
    this.cliente.bairro = "lol";
    this.cliente.nome = "lol";
    this.cliente.bairro = cliente.toLocaleString();
    console.log(this.http.post('http://localhost:8080/cliente/add', this.cliente));
  }

  getVenda(id){
    return this.http.get<Cliente[]>("http://localhost:8080/venda/getTest/"+id);
  }
  
}
