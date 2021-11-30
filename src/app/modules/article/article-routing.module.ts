import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/pages/create/create.component';
import { DetailComponent } from './components/pages/detail/detail.component';

const routes: Routes = [
  {path:'', redirectTo: 'index', pathMatch: 'full'},
  {path:'index', component: CreateComponent},
  {path:'create', component: CreateComponent},
  {path:'detail/:id', component: DetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
