import { DataFormModule } from './data-form/data-form.module';
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

@NgModule({
  declarations: [
    AppComponent,
    VendasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateFormModule,
    DataFormModule,
    NgSelectModule,
    CommonModule,
    Ng2SmartTableModule
  ],
  providers: [VendasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
