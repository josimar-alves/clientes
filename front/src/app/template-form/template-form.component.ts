import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Cliente } from '../shared/models/cliente';
import { DropdownService } from '../shared/services/dropdown.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  private baseUrl = 'http://localhost:8080/cliente';

private value:any = {};
private _disabledV:string = '0';
private disabled:boolean = false; 

private get disabledV():string {
  return this._disabledV;
}

private set disabledV(value:string) {
  this._disabledV = value;
  this.disabled = this._disabledV === '1';
}

public selected(value:any):void {
  console.log('Selected value is: ', value);
}

public removed(value:any):void {
  console.log('Removed value is: ', value);
}

public typed(value:any):void {
  console.log('New search input: ', value);
}

public refreshValue(value:any):void {
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
  ) {  }

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
        numero: dados.numCasa,
        bairro: dados.bairro,
        telefone: dados.telefone, 
        pontoReferencia: dados.pontoReferencia
      }
    });

    // console.log(form);
  }

  getTotal(tradicional, canadense, original, australiano, cheddarSimples, cheddarDuplo, onions, comboRefri, comboCerveja, batata, batataCheddar, refrigerante) {
    
    return (tradicional*10.00 + canadense*12.00 + original*12.00 + australiano*12.00 + cheddarSimples*12.00 +
    cheddarDuplo*14.00 + onions*7.00 + comboRefri*5.00 + comboCerveja*7.00 + batata*3.50 +
    batataCheddar*6.00 + refrigerante*2.00 + 1).toFixed(2);
  }

  salvarCliente(formulario) {
    let valueSubmit = Object.assign({}, formulario.value.cliente);
     
    if (valueSubmit.clienteID === null || valueSubmit.clienteID === "") {
      let json = JSON.stringify(valueSubmit);
      let headers = new HttpHeaders({'Content-Type': 'application/json'}); 
      this.http.post(`${this.baseUrl}/add`, json, {headers}).toPromise().then((data:any) => {
        console.log(this.populaDadosForm(data, formulario));
      });
    } else {
      console.log("não cadastra")
    }
   }

   limparCliente(formulario) {
    formulario.form.patchValue({
      cliente: {
        clienteID: null,
        nome: null,
        rua: null,
        numero: null,
        bairro: null,
        telefone: null, 
        pontoReferencia: null
      }
    });
   }

   public maskPhone = ['(', /[0-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskNumber = [/[0-9]/, /\d/, /\d/, /\d/, /\d/];


  salvarVenda(formulario) {


    var venda = 
    {
        "name": name
    };



    let valueSubmit = Object.assign({}, formulario.value.itemsVenda);
    let json = JSON.parse((JSON.stringify(valueSubmit)));
    console.log(json.tradicional)


    json.forEach(element => {
      console.log(element)
    });


    if (valueSubmit.clienteID === null || valueSubmit.clienteID === "") {
      let json = JSON.stringify(valueSubmit);
      let headers = new HttpHeaders({'Content-Type': 'application/json'}); 
      this.http.post(`${this.baseUrl}/add`, json, {headers}).toPromise().then((data:any) => {
        console.log(this.populaDadosForm(data, formulario));
      });
    } else {
      console.log("não cadastra")
    }
   }

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







}
