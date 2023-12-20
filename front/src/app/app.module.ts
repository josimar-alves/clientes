import { TemplateFormModule } from './template-form/template-form.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { VendasComponent } from './vendas/vendas.component';
import { VendasService } from './vendas/venda.service';
import { ProdutosComponent } from './produtos/produtos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrintComponent } from './print/print.component';
import { ReportsComponent } from './reports/reports.component';
import { TabelaProdutoComponent } from './produtos/tabela-produto/tabela-produto.component';
@NgModule({
  declarations: [
    AppComponent,
    VendasComponent,
    ProdutosComponent,
    TabelaProdutoComponent,
    PrintComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateFormModule,
    NgSelectModule,
    CommonModule,
    NgxPaginationModule,
    Ng2SmartTableModule
  ],
  providers: [VendasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
