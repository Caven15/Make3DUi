import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  public articles: Article[] = [];

  constructor(private _articleService: ArticleService, private _utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this._articleService.GetAll().subscribe({
      next: (articles) => {
        this.articles = articles;
      },
      error: (errors) => {
        console.log(errors);
      },
      complete: () => {
        for(let article of this.articles){
          //article.utilisateur = this._utilisateurService.GetById(article.id_utilisateur).subscribe
        }
      }
    });
  }

  
}
