import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';
import { UserPublique } from 'src/app/models/utilisateur/userPublique.model';
import { ArticleService } from 'src/app/services/article.service';
import { SessionService } from 'src/app/services/session.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-liste-by-user',
  templateUrl: './liste-by-user.component.html',
  styleUrls: ['./liste-by-user.component.scss']
})
export class ListeByUserComponent implements OnInit {

  public articles: Article[] = [];
  public createur: UserPublique;
  public isCreateur: boolean = false;

  constructor(private _utilisateurService: UtilisateurService,
              private _articleService: ArticleService, 
              private _sessionService : SessionService, 
              private _route: Router,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(!this._sessionService.isConnected()){
      this._route.navigate(['auth', 'login']);
      return;
    }
    // Si l'utilisateur est connecté
    let connectedUserId: number = this._sessionService.currentUser.id;
    let id: number;
    if(this._activatedRoute.snapshot.params['id']){
      id = parseInt(this._activatedRoute.snapshot.params['id']);
    }
    else{
      id = connectedUserId;
    }
    
    if(connectedUserId != id){
      console.log(id);
      this.isCreateur = false;
      this._utilisateurService.GetById(id).subscribe(
        {
          next: (user)  => {
            this.createur = user;
          },
          error : (error) => {
            console.log(error);
            this._route.navigate(["article","index"]);
          },
          complete : () => {}
        }
      );
    }
    else{
      this.isCreateur = true;
    }
    console.log("continuons");
    console.log(id);
    this._articleService.GetAllByUserId(id).subscribe(
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