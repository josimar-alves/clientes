import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Cliente } from '../shared/models/cliente';
import { DropdownService } from '../shared/services/dropdown.service';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { element } from 'protractor';
import { Observable, Subject, empty } from 'rxjs';
import { DadosProduto } from '../produtos/dados-produto';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  private baseUrl = 'http://localhost:8080/cliente';

  private _disabledV: string = '0';
  private disabled: boolean = false;
  private buttonNameClienteAction: String = "Salvar";
  private buttonNameVendaAction: String = "Salvar";
  private entrega: any = 1;
  private total: any = 0;
  private cartao: boolean = false;
  private vendaID: number = 0;
  private txtPrint = '';
  private txtCozinha = '';
  private newTotal: number = 0;
  private refrigerante: any = '';
  
  produtos$: Observable<DadosProduto[]>;
  listProdutos: DadosProduto[];
  listProdutosCol1: DadosProduto[] = [];
  listProdutosCol2: DadosProduto[] = [];
  listProdutosCol3: DadosProduto[] = [];
  listProdutosCol4: DadosProduto[] = [];
  error$ = new Subject<boolean>();


  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  clientes: Cliente[];

  onSubmit(formulario) {
  }

  constructor(
    private http: HttpClient,
    private service: DropdownService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.getClientes().subscribe(dados => {
      this.clientes = dados;
    });

    setTimeout(() => {  
      this.route.queryParams.subscribe(params => {
        if (params['venda'] != null) {
          this.vendaID = params['venda'];
          setTimeout(() => {
            (<HTMLInputElement>document.getElementById("newVendaID")).click();
          }, 100);
        }
      });
    }, 500);

    this.produtos$ = this.service.getProdutos().pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return empty();
      })
    );

    this.service.getProdutos()
      .pipe(
        catchError(error => empty())
      )
      .subscribe(
        dados => {
          let i = 0;
          let aux = 0;

          this.listProdutosCol1 = [];
          this.listProdutosCol2 = [];
          this.listProdutosCol3 = [];
          this.listProdutosCol4 = [];

          while (i < dados.length) {
            this.listProdutos = dados;
            if (aux === 0) {
              this.listProdutosCol1.push(dados[i]);
              aux = 1;
            } else if (aux === 1) {
              this.listProdutosCol2.push(dados[i]);
              aux = 2;
            } else if (aux === 2) {
              this.listProdutosCol3.push(dados[i]);
              aux = 3;
            } else {
              this.listProdutosCol4.push(dados[i]);
              aux = 0;
            }
            i += 1;
          }
        }
      );
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  setCliente(cliente, form) {
    if (cliente != null && cliente !== '') {
      this.populaClienteForm(cliente, form);
    }
  }

  setVendaID(venda, formulario) {
    formulario.form.patchValue({
      newVendaID: venda.id
    });
    this.buttonNameVendaAction = "Modificar";
  }

  populaClienteForm(dados, formulario) {
    formulario.form.patchValue({
      cliente: {
        id: dados.id,
        nome: dados.nome,
        rua: dados.rua,
        numCasa: dados.numCasa,
        bairro: dados.bairro,
        telefone: dados.telefone,
        pontoReferencia: dados.pontoReferencia
      }
    });
    this.buttonNameClienteAction = "Modificar";
  }

  populaVendaForm(dados, formulario) {
    dados.forEach(element => {
      this.listProdutos.forEach(aux => {
        if (aux.id == element[0]) {
          aux.quantidade = element[1];
          this.setPedidoTxt();
        }
      });
    });
    this.buttonNameVendaAction = "Modificar";
  }

  getVenda(form) {
    if (this.vendaID > 0 && form.value.newVendaID === '') {
      this.service.getVenda(this.vendaID).subscribe(venda => {
        if (venda != null) {
          this.setCliente(venda['venda']['cliente'], form);
          this.newTotal = venda['venda']['total'] - venda['venda']['entrega'] - venda['venda']['adicional'];
          form.form.patchValue({
              newVendaID: this.vendaID,
              newObs: venda['venda']['obs'],
              newTroco: venda['venda']['troco'],
              newAdicional: venda['venda']['adicional']
          });
        }
        var items = [];
        (<HTMLInputElement>document.getElementById("checkCartao")).checked = venda['venda']['cartao'];
        this.checkCartao();
        for (var i = 0; i < venda['items'].length; i++) {
          items[i] = [venda['items'][i]['produto']['id'], venda['items'][i]['quantidade']];
        }

        this.populaVendaForm(items, form);
        this.setTypeEntrega(venda['venda']['entrega']);
      });
    }
  }

  setTypeEntrega(valorEntrega) {
    if (valorEntrega == 0) {
      this.entrega = 0;
      (<HTMLInputElement>document.getElementById("gratis")).click();
    } else if (valorEntrega == 3) {
      this.entrega = 3;
      (<HTMLInputElement>document.getElementById("zonaRural")).click();
    } else {
      this.entrega = 1;
      (<HTMLInputElement>document.getElementById("cidade")).click();
    }
  }

  getForm() {
    return "implementar retorno de form";
  }

  getTotal() {
    return this.total;
  }

  getTroco(valor) {
    document.getElementById("clientes").removeAttribute;
    var x = document.getElementById("total").textContent;
    return (valor - parseFloat(x)).toFixed(2);
  }

  setEntrega(value) {
    this.entrega = value;
  }

  getEntrega() {
    return this.entrega.toFixed(2);
  }

  checkCartao() {
    if ((<HTMLInputElement> document.getElementById("checkCartao")).checked) {
      this.cartao = true;
    } else {
      this.cartao = false;
    }
  }

  getCartao() {
    return this.cartao;
  }

  clienteAction(formulario) {
    let valueSubmit = Object.assign({}, formulario.value.cliente);
    if (valueSubmit.id === null || valueSubmit.id === "") {
      this.salvarCliente(formulario);
    } else {
      this.modificarCliente(formulario);
    }
  }

  salvarCliente(formulario) {
    let valueSubmit = Object.assign({}, formulario.value.cliente);
    if (valueSubmit.id === null || valueSubmit.id === "") {
      if (confirm("Confirmar cadastro de usuário")) {
        let json = JSON.stringify(valueSubmit);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.post(`${this.baseUrl}/add`, json, { headers }).toPromise().then((data: any) => {
          this.populaClienteForm(data, formulario);
          this.buttonNameClienteAction = "Modificar";
        });
        setTimeout(() => { this.ngOnInit(); }, 250);
        this.openSnackbar("snackClienteAdicionado");
      }
    } else {
      this.openSnackbar("snackbarClienteExistente");
    }
  }

  modificarCliente(formulario) {
    let valueSubmit = Object.assign({}, formulario.value.cliente);

    if (confirm("Confirmar modificação de usuário")) {
      let json = JSON.stringify(valueSubmit);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.put(`${this.baseUrl}/modify`, json, { headers }).toPromise().then((data: any) => {
        this.populaClienteForm(data, formulario);
      });
      this.openSnackbar("snackClienteModificado");
      setTimeout(() => { this.ngOnInit(); }, 250);
    }
  }

  limparCliente(formulario) {
    formulario.form.patchValue({
      cliente: {
        id: null,
        nome: null,
        rua: null,
        numCasa: null,
        bairro: null,
        telefone: null,
        pontoReferencia: null
      }
    });
    this.buttonNameClienteAction = "Salvar";
  }

  public maskPhone = ['(', /[0-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskNumber = [/[0-9]/, /\d/, /\d/, /\d/];

  
  novaVenda(formulario) {
    this.limparCliente(formulario);
    this.newClean(formulario);
  }


  openSnackbar(textID) {
    var x = document.getElementById(textID);
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }


  ///////////////////////////////

  somar(produto) {
    if (produto.quantidade < 99) {
      produto.quantidade += 1;
      this.listProdutos[produto.posicao].quantidade = produto.quantidade;
      this.newTotal += produto.preco;
      this.setPedidoTxt();
    }
  }

  subtrair(produto) {
    if (produto.quantidade > 0) {
      produto.quantidade -= 1;
      this.listProdutos[produto.posicao].quantidade = produto.quantidade;
      this.newTotal -= produto.preco;
      this.setPedidoTxt();
    }
  }

  newClean(formulario) {
    this.listProdutos.forEach(element => {
      element.quantidade = 0;
    });

    formulario.form.patchValue({
        newObs: "",
        newTroco: null,
        newVendaID: null,
        newAdicional: null,
        qtRefri: null
    });
    (<HTMLInputElement>document.getElementById("checkCartao")).checked = false;
    (<HTMLInputElement>document.getElementById("cidade")).checked = true;
    (<HTMLInputElement>document.getElementById("nenhum")).checked = true;
    this.setEntrega(1);
    this.cartao = false;
    this.buttonNameVendaAction = "Salvar";
    this.newTotal = 0;
  }

  newVendaAction(formulario) {
    if (formulario.value.newVendaID === null || formulario.value.newVendaID === "") {
      this.newSave(formulario);
    } else { 
      this.newModify(formulario);
    }
  }

  newSave(form) {
    let produtosJson = '';
    let temProduto = false; 
    this.listProdutos.forEach(p => {
      if (p.quantidade > 0) {
        produtosJson += '{ "produto": { "id": ' + p.id + ' }, "quantidade": ' + p.quantidade + ' },';
        temProduto = true;
      }
    });

    if (temProduto) {
      let json = '{ "items": [' + produtosJson.substr(0, produtosJson.length - 1) + ']' +
        ', "venda": {' +
        '"cliente": {' +
        '"id": ' + form.value.cliente.id +
        '},' +
        '"obs": "' + form.value.newObs + '"' +
        ', "troco": "' + form.value.newTroco + '"' +
        ', "adicional": "' + form.value.newAdicional + '"' +
        ', "entrega": "' + this.entrega + '"' +
        ', "cartao": "' + this.cartao + '"' +
        ', "total": ' + this.getNewTotal(form.value.newAdicional) + '}}';

      if (confirm("Confirmar venda")) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.post('http://localhost:8080/venda/addTest', json, { headers }).toPromise().then((data: any) => {
          this.setVendaID(data, form);
          this.openSnackbar("snackbarVendaFeita");
          this.buttonNameVendaAction = "Modificar";
        });
      }
    } else {
      this.openSnackbar("snackbarErroVenda");
    }
  }


  newModify(form) {
    let produtosJson = '';
    let temProduto = false; 
    this.listProdutos.forEach(p => {
      if (p.quantidade > 0) {
        produtosJson += '{ "produto": { "id": ' + p.id + ' }, "quantidade": ' + p.quantidade + ' },';
        temProduto = true;
      }
    });

    if (temProduto) {
      let json = '{ "items": [' + produtosJson.substr(0, produtosJson.length - 1) + ']' +
        ', "venda": {' +
        '"cliente": {' +
        '"id": ' + form.value.cliente.id +
        '},' +
        '"id": "' + form.value.newVendaID+'"' +
        ', "obs": "' + form.value.newObs + '"' +
        ', "troco": "' + form.value.newTroco + '"' +
        ', "adicional": "' + form.value.newAdicional + '"' +
        ', "entrega": "' + this.entrega + '"' +
        ', "cartao": "' + this.cartao + '"' +
        ', "total": ' + this.getNewTotal(form.value.newAdicional) + '}}';

      if (confirm("Confirmar Modificação da Venda")) {
        console.log(json)
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.delete("http://localhost:8080/venda/deleteItems/" + form.value.newVendaID, { headers }).toPromise().then((data: any) => {});
        setTimeout(() => { this.http.put('http://localhost:8080/venda/modifyTest', json, { headers }).toPromise().then((data: any) => {
            this.openSnackbar("snackbarVendaModificada");
          })}, 250);
      }
    } else {
      this.openSnackbar("snackbarErroVenda");
    }
  }

  async newPrint(formulario) {
    await this.setPedidoTxt();
    if (formulario.value.newVendaID != '' && formulario.value.newVendaID != null) {
      await this.newPrintPedido();
    } else {
      await this.openSnackbar("snackbarErroImprimir");
    }
  }

  newPrintPedido() {
    this.print2('printPedido');
  //  this.print2('printMsg')
    this.print2('pedidoCozinha');
  };

  print2(pedido) {
    var conteudo = document.getElementById(pedido).innerHTML;
    var tela_impressao = window.open('about:blank');
    tela_impressao.document.write('<div style="max-width: 280px; margin: 0">' + conteudo);
    setTimeout(() => { tela_impressao.window.print(); }, 250);
    setTimeout(() => { tela_impressao.window.close(); }, 250);
  }

  async setPedidoTxt(){
    this.txtPrint = await '';
    this.txtCozinha = await '';
    await this.listProdutos.forEach(p => {
      if (p.quantidade > 0) {
        this.txtPrint += '<b>' + p.quantidade + 'x ' + p.nome +':</b> R$ ' + p.preco.toFixed(2).replace('.',',') + '<br>';
        this.txtCozinha += p.quantidade + 'x ' + p.nome + '<br>';
      }
    });
    document.getElementById("teeeeste").innerHTML = await this.txtPrint;
    document.getElementById("teeeeste2").innerHTML = await this.txtCozinha;
  }

  setRefrigerante(formulario, refri){
    this.refrigerante = refri;
    var element = (<HTMLInputElement>document.getElementById("qtRefri"));
    if (refri != "" && (element.value == "" || element.value == null || element.value == "0")) {
      console.log('aqui');
      formulario.form.patchValue({
        qtRefri: 1
    });
    } else if (refri == "") {
      formulario.form.patchValue({
        qtRefri: null
       });
    }
  }

  getRefrigerante() {
    return this.refrigerante;
  }

  getNewTotal(adicional) {
    if (adicional == "" || adicional == null) {
      adicional = 0;
    }
    return (this.newTotal + this.entrega + adicional).toFixed(2);
  }

  getNewTroco(troco, adicional) {
    return (troco - this.getNewTotal(adicional)).toFixed(2);
  }
  
  /////////////////////// <b>2x Deck Tradicional:</b> R$ 10,00
}