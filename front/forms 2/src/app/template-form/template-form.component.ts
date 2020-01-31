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
    console.log(formulario);

    // form.value
    // console.log(this.usuario);

    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
      .subscribe(dados => {
        console.log(dados);
        formulario.form.reset();
      });
  }

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService,
    private dropdownServide: DropdownService
  ) {  }

  ngOnInit() {
    console.log("lol");
    this.dropdownServide.getClientes().subscribe(dados => {
      this.clientes = dados;
      console.log(dados);
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

  consultaCEP(cep, form) {
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados, form));
    }
  }



  setCliente(cliente, form) { 
    if (cliente != null && cliente !== '') {
      this.populaDadosForm(cliente, form);
    }
  
  }

  populaDadosForm(dados, formulario) {

    console.log(dados);

    formulario.form.patchValue({
      endereco: {
        rua: dados.descricao,
        numero: dados.nome,
        // cep: dados.cep,
        complemento: dados.preco,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    // console.log(form);
  }

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

}
