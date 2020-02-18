import { Component, OnInit } from '@angular/core';
import { VendasService } from './venda.service';
import { Venda } from './venda';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

  characters: Venda[];

  constructor(private vendaService: VendasService) { }

  ngOnInit() {
    this.vendaService.getCharacters().subscribe((data: Venda[]) => {
      this.characters = data;
    });
  }

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      cliente: {
        title: 'Nome'
      }
    }
  }

}
