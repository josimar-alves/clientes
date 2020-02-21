import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Cliente } from '../shared/models/cliente';
import { DropdownService } from '../shared/services/dropdown.service';
import { Validators } from '@angular/forms';
declare var $: any;

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
    console.log(formulario)
  }

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService,
    private dropdownServide: DropdownService
  ) { }

  ngOnInit() {
    this.dropdownServide.getClientes().subscribe(dados => {
      this.clientes = dados;
    })
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
      this.populaDadosForm(cliente, form);
    }
  }

  populaDadosForm(dados, formulario) {
    formulario.form.patchValue({
      cliente: {
        clienteID: dados.id,
        nome: dados.nome,
        rua: dados.rua,
        numCasa: dados.numCasa,
        bairro: dados.bairro,
        telefone: dados.telefone,
        pontoReferencia: dados.pontoReferencia
      }
    });

    // console.log(form);
  }

  getTotal(tradicional, canadense, original, australiano, cheddarSimples, cheddarDuplo, onions, comboRefri, comboCerveja, batata, batataCheddar, refrigerante) {

    return (tradicional * 10.00 + canadense * 12.00 + original * 12.00 + australiano * 12.00 + cheddarSimples * 12.00 +
      cheddarDuplo * 14.00 + onions * 7.00 + comboRefri * 5.00 + comboCerveja * 7.00 + batata * 3.50 +
      batataCheddar * 6.00 + refrigerante * 2.00 + 1).toFixed(2);
  }

  salvarCliente(formulario) {
    let valueSubmit = Object.assign({}, formulario.value.cliente);
    if (valueSubmit.clienteID === null || valueSubmit.clienteID === "") {
      if (confirm("Confirmar cadastro de usuário")) {
        let json = JSON.stringify(valueSubmit);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.post(`${this.baseUrl}/add`, json, { headers }).toPromise().then((data: any) => {
          console.log(this.populaDadosForm(data, formulario));
        });
        setTimeout(() => { this.ngOnInit(); }, 250);
        this.openSnackbar("snackClienteAdicionado");
      }
    } else {
      this.openSnackbar("snackbarClienteExistente");
    }
  }

  limparCliente(formulario) {
    formulario.form.patchValue({
      cliente: {
        clienteID: null,
        nome: null,
        rua: null,
        numCasa: null,
        bairro: null,
        telefone: null,
        pontoReferencia: null
      }
    });
  }

  public maskPhone = ['(', /[0-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskNumber = [/[0-9]/, /\d/, /\d/, /\d/, /\d/];

  limparVenda(formulario) {
    formulario.form.patchValue({
      itemsVenda: {
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
        observacoes: null
      }
    });
  }

  salvarVenda2(formulario) {

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
        }
      ],
      "venda": {
        "cliente": {
          "id": formulario.value.cliente.clienteID
        },
        "obs": formulario.value.itemsVenda.obs
      }
    };

    if (this.validaVenda(formulario) === true) {
      if (formulario.value.cliente.clienteID !== null && formulario.value.cliente.clienteID !== "") {
        if (confirm("Confirmar venda")) {
          let jsonVenda = (JSON.stringify(venda));
          console.log(jsonVenda);
          let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          this.http.post('http://localhost:8080/venda/addTest', jsonVenda, { headers }).toPromise().then((data: any) => {
            console.log(data);
            this.openSnackbar("snackbarVendaFeita");
            this.printPedido();
          });
        } else {
          this.openSnackbar("snackbarClienteInexistente");
        }
      }
    } else {
      this.openSnackbar("snackbarErroVenda");
    }
    this.openSnackbar("snackbarClienteInexistente");
  }

  openSnackbar(textID) {
    var x = document.getElementById(textID);
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
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
    }
    return false;
  }

  printPedido() {
    var conteudo = document.getElementById('printPedido').innerHTML;
    var tela_impressao = window.open('about:blank');
    tela_impressao.document.write('<div style="max-width: 280px; margin: 0">' + conteudo);
    setTimeout(() => { tela_impressao.window.print(); }, 250);
    setTimeout(() => { tela_impressao.window.close(); }, 250);
  };


}


