import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Cliente } from '../shared/models/cliente';
import { DropdownService } from '../shared/services/dropdown.service';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { element } from 'protractor';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  private baseUrl = 'http://localhost:8080/cliente';

  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;
  private buttonNameClienteAction: String = "Salvar";
  private buttonNameVendaAction: String = "Salvar";
  private entrega: any = 1;
  private total: any = 0;
  private cartao: boolean = false;
  private vendaID: number = 0;

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }


  clientes: Cliente[];

  selectedCity: any = {
    nome: null
  };

  usuario: any = {
    nome: null,
    email: null
  };

  onSubmit(formulario) {
  }

  constructor(
    private http: HttpClient,
    private dropdownServide: DropdownService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.dropdownServide.getClientes().subscribe(dados => {
      this.clientes = dados;
    });

    this.route.queryParams.subscribe(params => {
      if (params['venda'] != null) {
        this.vendaID = params['venda'];
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById("vendaID")).click();
        }, 100);
      }
    });
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
      itemsVenda: {
        vendaID: venda.id
      }
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
    // console.log(form);
  }

  populaVendaForm(dados, formulario) {
    dados.forEach(element => {
      if (element[0] == 1) {
        formulario.form.patchValue({itemsVenda: {tradicional: element[1]}});
      } else if (element[0] == 2) {
        formulario.form.patchValue({itemsVenda: {canadense: element[1]}});
      } else if (element[0] == 3) {
        formulario.form.patchValue({itemsVenda: {original: element[1]}});
      } else if (element[0] == 4) {
        formulario.form.patchValue({itemsVenda: {australiano: element[1]}});
      } else if (element[0] == 5) {
        formulario.form.patchValue({itemsVenda: {cheddarSimples: element[1]}});
      } else if (element[0] == 6) {
        formulario.form.patchValue({itemsVenda: {cheddarDuplo: element[1]}});
      } else if (element[0] == 7) {
        formulario.form.patchValue({itemsVenda: {onions: element[1]}});
      } else if (element[0] == 8) {
        formulario.form.patchValue({itemsVenda: {comboRefri: element[1]}});
      } else if (element[0] == 9) {
        formulario.form.patchValue({itemsVenda: {comboCerveja: element[1]}});
      } else if (element[0] == 10) {
        formulario.form.patchValue({itemsVenda: {batata: element[1]}});
      } else if (element[0] == 11) {
        formulario.form.patchValue({itemsVenda: {batataCheddar: element[1]}});
      } else if (element[0] == 12) {
        formulario.form.patchValue({itemsVenda: {refrigerante: element[1]}});
      } else if (element[0] == 13) {
        formulario.form.patchValue({itemsVenda: {crispy: element[1]}});
      } else if (element[0] == 14) {
        formulario.form.patchValue({itemsVenda: {cheddarMelt: element[1]}});
      } else if (element[0] == 15) {
        formulario.form.patchValue({itemsVenda: {prime: element[1]}});
      } else if (element[0] == 16) {
        formulario.form.patchValue({itemsVenda: {adicional: element[1]}});
      }
    });
    this.buttonNameVendaAction = "Modificar";
  }

  getVenda(form) {
    if (this.vendaID > 0 && form.value.itemsVenda.vendaID === '') {
      this.dropdownServide.getVenda(this.vendaID).subscribe(venda => {
        if (venda != null) {
          this.setCliente(venda['venda']['cliente'], form);
          form.form.patchValue({
            itemsVenda: {
              vendaID: this.vendaID,
              obs: venda['venda']['obs'],
              troco: venda['venda']['troco']
            }
          });
        }
        var items = [];
  
        for (var i = 0; i < venda['items'].length; i++) {
          items[i] = [venda['items'][i]['produto']['id'], venda['items'][i]['quantidade']];
        }
        this.populaVendaForm(items, form);

        setTimeout(() => {
          var valorEntrega = venda['venda']['total'] - this.getTotal() + 1;
          if (valorEntrega == 0) {
            (<HTMLInputElement>document.getElementById("gratis")).click();
          } else if (valorEntrega == 2) {
            (<HTMLInputElement>document.getElementById("zonaRural")).click();
          } else {
            (<HTMLInputElement>document.getElementById("cidade")).click();
          }
        }, 500);
      });
    }
  }

  getForm() {
    return "implementar retorno de form";
  }

  getTotal() {
    return this.total;
  }

  setTotal(adicional, crispy, cheddarMelt, prime, tradicional, canadense, original, australiano, cheddarSimples, cheddarDuplo, onions, comboRefri, comboCerveja, batata, batataCheddar, refrigerante) {
    this.total = (adicional * 1 + crispy * 10.00 + cheddarMelt * 10.00 + prime * 10.00 + tradicional * 10.00 + canadense * 12.00 + original * 12.00 + australiano * 12.00 + cheddarSimples * 12.00 +
      cheddarDuplo * 14.00 + onions * 7.00 + comboRefri * 6.00 + comboCerveja * 8.00 + batata * 4.00 +
      batataCheddar * 6.00 + refrigerante * 2.50 + this.entrega).toFixed(2);
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
    if (this.cartao == true) {
      this.cartao = false;
    } else {
      this.cartao = true;
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

  vendaAction(formulario) {
    let valueSubmit = Object.assign({}, formulario.value.itemsVenda);
    if (valueSubmit.vendaID === null || valueSubmit.vendaID === "") {
      this.salvarVenda(formulario);
    } else {
      this.modificarVenda(formulario);
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
        console.log(this.populaClienteForm(data, formulario));
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

  limparVenda(formulario) {
    formulario.form.patchValue({
      itemsVenda: {
        adicional: null,
        crispy: null,
        cheddarMelt: null,
        prime: null,
        tradicional: null,
        canadense: null,
        original: null,
        australiano: null,
        cheddarSimples: null,
        cheddarDuplo: null,
        onions: null,
        comboRefri: null,
        comboCerveja: null,
        batata: null,
        batataCheddar: null,
        refrigerante: null,
        obs: null,
        troco: null,
        vendaID: null
      }
    });
    (<HTMLInputElement>document.getElementById("checkCartao")).checked = false;
    (<HTMLInputElement>document.getElementById("cidade")).checked = true;
    this.setEntrega(1);
    this.cartao = false;
    this.buttonNameVendaAction = "Salvar";
  }

  novaVenda(formulario) {
    this.limparCliente(formulario);
    this.limparVenda(formulario);
  }

  salvarVenda(formulario) {
    var venda =
    {
      "items": [
        {
          "produto": {
            "id": 1
          },
          "quantidade": formulario.value.itemsVenda.tradicional
        }, {
          "produto": {
            "id": 2
          },
          "quantidade": formulario.value.itemsVenda.canadense
        }, {
          "produto": {
            "id": 3
          },
          "quantidade": formulario.value.itemsVenda.original
        }, {
          "produto": {
            "id": 4
          },
          "quantidade": formulario.value.itemsVenda.australiano
        }, {
          "produto": {
            "id": 5
          },
          "quantidade": formulario.value.itemsVenda.cheddarSimples
        }, {
          "produto": {
            "id": 6
          },
          "quantidade": formulario.value.itemsVenda.cheddarDuplo
        }, {
          "produto": {
            "id": 7
          },
          "quantidade": formulario.value.itemsVenda.onions
        }, {
          "produto": {
            "id": 8
          },
          "quantidade": formulario.value.itemsVenda.comboRefri
        }, {
          "produto": {
            "id": 9
          },
          "quantidade": formulario.value.itemsVenda.comboCerveja
        }, {
          "produto": {
            "id": 10
          },
          "quantidade": formulario.value.itemsVenda.batata
        }, {
          "produto": {
            "id": 11
          },
          "quantidade": formulario.value.itemsVenda.batataCheddar
        }, {
          "produto": {
            "id": 12
          },
          "quantidade": formulario.value.itemsVenda.refrigerante
        }, {
          "produto": {
            "id": 13
          },
          "quantidade": formulario.value.itemsVenda.crispy
        }, {
          "produto": {
            "id": 14
          },
          "quantidade": formulario.value.itemsVenda.cheddarMelt
        }, {
          "produto": {
            "id": 15
          },
          "quantidade": formulario.value.itemsVenda.prime
        }, {
          "produto": {
            "id": 16
          },
          "quantidade": formulario.value.itemsVenda.adicional
        }
      ],
      "venda": {
        "cliente": {
          "id": formulario.value.cliente.id
        },
        "obs": formulario.value.itemsVenda.obs,
        "troco": formulario.value.itemsVenda.troco,
        "total": document.getElementById("total").textContent
      }
    };

    if (this.validaVenda(formulario) === true) {
      if (formulario.value.cliente.id !== null && formulario.value.cliente.id !== "") {
        if (confirm("Confirmar venda")) {
          let jsonVenda = (JSON.stringify(venda));
          let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          this.http.post('http://localhost:8080/venda/addTest', jsonVenda, { headers }).toPromise().then((data: any) => {
            this.setVendaID(data, formulario);
            this.openSnackbar("snackbarVendaFeita");
          });
        }
      } else {
        this.openSnackbar("snackbarClienteInexistente");
      }
    } else {
      this.openSnackbar("snackbarErroVenda");
    }
  }


  modificarVenda(formulario) {
    var venda =
    {
      "items": [
        {
          "produto": {
            "id": 1
          },
          "quantidade": formulario.value.itemsVenda.tradicional
        }, {
          "produto": {
            "id": 2
          },
          "quantidade": formulario.value.itemsVenda.canadense
        }, {
          "produto": {
            "id": 3
          },
          "quantidade": formulario.value.itemsVenda.original
        }, {
          "produto": {
            "id": 4
          },
          "quantidade": formulario.value.itemsVenda.australiano
        }, {
          "produto": {
            "id": 5
          },
          "quantidade": formulario.value.itemsVenda.cheddarSimples
        }, {
          "produto": {
            "id": 6
          },
          "quantidade": formulario.value.itemsVenda.cheddarDuplo
        }, {
          "produto": {
            "id": 7
          },
          "quantidade": formulario.value.itemsVenda.onions
        }, {
          "produto": {
            "id": 8
          },
          "quantidade": formulario.value.itemsVenda.comboRefri
        }, {
          "produto": {
            "id": 9
          },
          "quantidade": formulario.value.itemsVenda.comboCerveja
        }, {
          "produto": {
            "id": 10
          },
          "quantidade": formulario.value.itemsVenda.batata
        }, {
          "produto": {
            "id": 11
          },
          "quantidade": formulario.value.itemsVenda.batataCheddar
        }, {
          "produto": {
            "id": 12
          },
          "quantidade": formulario.value.itemsVenda.refrigerante
        }, {
          "produto": {
            "id": 13
          },
          "quantidade": formulario.value.itemsVenda.crispy
        }, {
          "produto": {
            "id": 14
          },
          "quantidade": formulario.value.itemsVenda.cheddarMelt
        }, {
          "produto": {
            "id": 15
          },
          "quantidade": formulario.value.itemsVenda.prime
        }, {
          "produto": {
            "id": 16
          },
          "quantidade": formulario.value.itemsVenda.adicional
        }
      ],
      "venda": {
        "cliente": {
          "id": formulario.value.cliente.id
        },
        "id": formulario.value.itemsVenda.vendaID,
        "obs": formulario.value.itemsVenda.obs,
        "troco": formulario.value.itemsVenda.troco,
        "total": document.getElementById("total").textContent
      }
    };

    if (this.validaVenda(formulario) === true) {
      if (formulario.value.cliente.id !== null && formulario.value.cliente.id !== "") {
        if (confirm("Confirmar Modificação da Venda")) {
          let jsonVenda = (JSON.stringify(venda));
          let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

          this.http.delete("http://localhost:8080/venda/deleteItems/" + formulario.value.itemsVenda.vendaID, { headers }).toPromise().then((data: any) => {
            console.log("Apagou " + formulario.value.itemsVenda.vendaID);
          });

          this.http.put('http://localhost:8080/venda/modifyTest', jsonVenda, { headers }).toPromise().then((data: any) => {
            this.openSnackbar("snackbarVendaModificada");
          });
        }
      } else {
        this.openSnackbar("snackbarClienteInexistente");
      }
    } else {
      this.openSnackbar("snackbarErroVenda");
    }
  }

  openSnackbar(textID) {
    var x = document.getElementById(textID);
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  validaVenda(formulario) {
    if (formulario.value.itemsVenda.tradicional >= 1) {
      return true
    } else if (formulario.value.itemsVenda.canadense >= 1) {
      return true;
    } else if (formulario.value.itemsVenda.original >= 1) {
      return true;
    } else if (formulario.value.itemsVenda.australiano >= 1) {
      return true;
    } else if (formulario.value.itemsVenda.cheddarSimples >= 1) {
      return true;
    } else if (formulario.value.itemsVenda.cheddarDuplo >= 1) {
      return true;
    } else if (formulario.value.itemsVenda.onions >= 1) {
      return true;
    } else if (formulario.value.itemsVenda.comboRefri >= 1) {
      return true;
    } else if (formulario.value.itemsVenda.comboCerveja >= 1) {
      return true;
    } else if (formulario.value.itemsVenda.batata >= 1) {
      return true;
    } else if (formulario.value.itemsVenda.batataCheddar >= 1) {
      return true;
    } else if (formulario.value.itemsVenda.refrigerante >= 1) {
      return true;
    } else if (formulario.value.itemsVenda.crispy >= 1) {
      return true;
    } else if (formulario.value.itemsVenda.cheddarMelt >= 1) {
      return true;
    } else if (formulario.value.itemsVenda.prime >= 1) {
      return true;
    } else if (formulario.value.itemsVenda.adicional >= 1) {
      return true;
    }
    return false;
  }

  imprimir(formulario) {
    /*this.printPedido();*/
    if (formulario.value.itemsVenda.vendaID != '' && formulario.value.itemsVenda.vendaID != null) {
      this.printPedido();
    } else {
      this.openSnackbar("snackbarErroImprimir");
    }
  }

  printPedido() {
    this.print('printPedido');
    this.print('pedidoCozinha');
  };

  print(pedido) {
    var conteudo = document.getElementById(pedido).innerHTML;
    var tela_impressao = window.open('about:blank');
    tela_impressao.document.write('<div style="max-width: 280px; margin: 0">' + conteudo);
    setTimeout(() => { tela_impressao.window.print(); }, 250);
    setTimeout(() => { tela_impressao.window.close(); }, 250);
  }

}


