import { TemplateFormComponent } from './template-form/template-form.component';
import { VendasComponent } from './vendas/vendas.component';
import { PrintComponent } from './print/print.component'
import { ProdutosComponent } from './produtos/produtos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'templateForm', component: TemplateFormComponent },
  { path: 'vendas', component: VendasComponent },
  { path: 'print', component: PrintComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: '', pathMatch: 'full', redirectTo: 'vendas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }