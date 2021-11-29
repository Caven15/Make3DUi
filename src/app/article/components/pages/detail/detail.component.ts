import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { SessionService } from 'src/app/services/session.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public article: Article;
  public estCreateur: boolean;
  public estSignaleParUserId: boolean;

  constructor(private _activatedRoute: ActivatedRoute, private _route: Router, private _articleService: ArticleService, private _sessionService: SessionService, private _utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    if(!this._sessionService.isConnected()){
      this._route.navigate(['auth', 'login']);
      return;
    }
    // L'utilisateur est connecté
    let id: number = parseInt(this._activatedRoute.snapshot.params['id']);
    this._articleService.GetById(id).subscribe(article => {
      this.article = article;
      // Si l'article n'existe pas
      if (!article || article == null){
        this._route.navigate(['article']); // charge index par default a condition que la page existe !
        return;
      }
      // Si l'article existe
      this.estCreateur = (this.article.id_utilisateur == this._sessionService.currentUser.id);
      this._articleService.EstSignaleParUserId(this.article.id, this._sessionService.currentUser.id).subscribe(estSignale =>{
        this.estSignaleParUserId = estSignale;
      });
    });
  }

  update(){
    this._route.navigate(['article','update', this.article.id]);
  }
  delete(){
    this._route.navigate(['article','delete',this.article.id]);
  }
  signalement(){
    this._articleService.Signalement(this.article.id);
    this.refresh();
  }

  designaler(){
    this._articleService.Designaler(this.article.id);
    this.refresh();
  }
}
