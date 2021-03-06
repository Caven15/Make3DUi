import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { CreateComponent } from './components/pages/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './components/pages/detail/detail.component';
import { ListeComponent } from './components/pages/liste/liste.component';
import { UpdateComponent } from './components/pages/update/update.component';
import { DeleteComponent } from './components/pages/delete/delete.component';
import { ListeByUserComponent } from './components/pages/liste-by-user/liste-by-user.component';
import { ItemComponent } from './components/pages/item/item.component';
import { CommentaireComponent } from './components/pages/commentaire/commentaire.component';


@NgModule({
  declarations: [
    CreateComponent,
    DetailComponent,
    ListeComponent,
    UpdateComponent,
    DeleteComponent,
    ListeByUserComponent,
    ItemComponent,
    CommentaireComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ArticleRoutingModule
  ],
  exports:[
    ItemComponent
  ]
})
export class ArticleModule { }
