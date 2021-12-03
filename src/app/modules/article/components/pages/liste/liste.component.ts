import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {

  public articles: Article[] = [];

  constructor(private _articleService: ArticleService, private _sessionService : SessionService, private _route: Router) { }

  ngOnInit(): void {
    if(!this._sessionService.isConnected()){
      this._route.navigate(['auth', 'login']);
      return;
    }
    // Si l'utilisateur est connecté
    this._articleService.GetAll().subscribe(
      {
        next: (articles)  => {
          this.articles = articles
        },
        error : (error) => {
          console.log(error);
        },
        complete : () => {}
      }
    );   
  }
}
