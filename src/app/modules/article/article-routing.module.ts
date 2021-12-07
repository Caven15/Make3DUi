import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/pages/create/create.component';
import { DeleteComponent } from './components/pages/delete/delete.component';
import { DetailComponent } from './components/pages/detail/detail.component';
import { ListeByUserComponent } from './components/pages/liste-by-user/liste-by-user.component';
import { ListeComponent } from './components/pages/liste/liste.component';
import { UpdateComponent } from './components/pages/update/update.component';

const routes: Routes = [
  {path:'', redirectTo: 'index', pathMatch: 'full'},
  {path:'index', component: ListeComponent},
  {path:'create', component: CreateComponent},
  {path:'detail/:id', component: DetailComponent},
  {path:'update/:id', component: UpdateComponent},
  {path:'delete/:id', component: DeleteComponent},
  {path:'listeByUser', component: ListeByUserComponent},
  {path:'listeByUser/:id', component: ListeByUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
