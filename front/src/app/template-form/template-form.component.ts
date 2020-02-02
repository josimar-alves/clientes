import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Cliente } from '../shared/models/cliente';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {


  public items:Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
  'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
  'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
  'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
  'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
  'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
  'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
  'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
  'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
  'Zagreb', 'Zaragoza', 'Łódź'];

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
    this.dropdownServide.addCliente(formulario.value.endereco);
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
      endereco: {
        nomeCliente: dados.nome,
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

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        numero: null,
        bairro: null,
        telefone: null, 
        pontoReferencia: null
      }
    });
  }

}
