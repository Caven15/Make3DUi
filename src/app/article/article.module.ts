import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { CreateComponent } from './components/pages/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './components/pages/detail/detail.component';


@NgModule({
  declarations: [
    CreateComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
