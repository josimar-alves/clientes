import { DataFormComponent } from './data-form/data-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { VendasComponent } from './vendas/vendas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'templateForm', component: TemplateFormComponent },
  { path: 'dataForm', component: DataFormComponent },
  { path: 'vendas', component: VendasComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dataForm' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
