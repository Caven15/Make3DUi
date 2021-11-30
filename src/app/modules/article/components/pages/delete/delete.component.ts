import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { SessionService } from 'src/app/services/session.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  public article: Article;

  constructor(private _activatedRoute: ActivatedRoute, private _route: Router, private _articleService: ArticleService, private _sessionService: SessionService, private _utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    // L'utilisateur n'est pas connecté
    if(!this._sessionService.isConnected()){
      this._route.navigate(['auth', 'login']);
      return;
    }
    // L'utilisateur est connecté
    let id: number = parseInt(this._activatedRoute.snapshot.params['id']);
    this._articleService.GetById(id).subscribe(
      {
        next: (article) => {
          this.article = article;
          // Si l'article n'existe pas
          if (!article || article == null){
            this._route.navigate(['article']); // charge index par default a condition que la page existe !
            return;
          }
          // Si l'article existe
          if(this.article.id_utilisateur != this._sessionService.currentUser.id){// Si pas créateur
            this._route.navigate(['article']); // charge index par default a condition que la page existe !
            return;
          }
          // Si créateur
        },
        error: (errors) => {
          console.log(errors)
        },
        complete: () => {
          console.log('refresh OK');
        }
      }
    );
  }

  annuler(){
    this._route.navigate(['article','detail', this.article.id]);
  }

  delete(){
    this._articleService.Delete(this.article.id).subscribe({
      error: (errors) =>{
        console.log(errors);
      },
      complete: () => {
        console.log('article supprimé');
        this._route.navigate(['article']);
      }
    });
  }
}
