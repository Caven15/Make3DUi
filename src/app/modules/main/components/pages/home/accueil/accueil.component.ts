import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  public articles: Article[] = [];

  constructor(private _articleService: ArticleService) { }

  ngOnInit(): void {
    this._articleService.GetAll().subscribe(articles => this.articles = articles);
  }

  
}