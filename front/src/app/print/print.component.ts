import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  print() {
    var conteudo = document.getElementById('print').innerHTML;
    var tela_impressao = window.open('about:blank');
    tela_impressao.document.write(conteudo);
    setTimeout(() => { tela_impressao.window.print(); }, 250);
    setTimeout(() => { tela_impressao.window.close(); }, 250);
  }

  setImg() {
    // Setar imagem
  }

}
