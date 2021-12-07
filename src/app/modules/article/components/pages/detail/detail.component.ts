import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HubConnection } from '@aspnet/signalr'; // install => npm i @aspnet/signalr --save
import * as signalR from '@aspnet/signalr';
import { Article } from 'src/app/models/article/article.model';
import { Commentaire } from 'src/app/models/commentaire/commentaire.model';
import { ArticleService } from 'src/app/services/article.service';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { SessionService } from 'src/app/services/session.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public commentaires: Commentaire[] = [];
  public commentaireForm: FormGroup;
  public article: Article = new Article();
  public estCreateur: boolean;
  public estSignaleParUserId: boolean;
  private hubConnection: HubConnection;

  constructor(private _activatedRoute: ActivatedRoute, private _route: Router, private _articleService: ArticleService, private _commentaireService: CommentaireService, private _sessionService: SessionService, private _utilisateurService: UtilisateurService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.refresh();
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.chatHubUrl}`).build();

    this.hubConnection.start().then(() => {
      console.log("connection started");
    }).catch(err => console.log(err));

    this.hubConnection.onclose(() => {
      debugger;
      setTimeout(() => {
        debugger;
        this.hubConnection.start().then(() => {
          debugger;
          console.log("connection started");
        }).catch(err => console.log(err));
      }, 5000);
    });

    // A la récéption de la liste des commentaires du serveur au client
    this.hubConnection.on("recevoirCommentaires", (commentaires, id_article) => {// data : listes des commentaires
      if(this.article.id == id_article){
        this.commentaires = commentaires;
         console.log("recevoirCommentaires");
      }
      
    });
  }

  public stopConnection() {
    this.hubConnection.start().then(() => {
      console.log("stopped");
    }).catch(err => console.log(err));
  }

  refresh(): void {
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
          this.estCreateur = (this.article.id_utilisateur == this._sessionService.currentUser.id);
          this._articleService.EstSignaleParUserId(this.article.id, this._sessionService.currentUser.id).subscribe(
            {
              next : (estSignale) =>{
                this.estSignaleParUserId = estSignale;
              },
              complete: () => {
                console.log('refresh OK');
              }
            }
          );
          // récupérer les commentaires
          this.chargerCommentaires();
        },
        error: (errors) => {
          console.log(errors)
        },
        complete: () => {
          
        }
      }
    );
    this.commentaireForm = this._formBuilder.group({
      commentaire : [null, [Validators.required]]
    });
  }

  chargerCommentaires() : void{
    this._commentaireService.GetAllByArticleId(this.article.id).subscribe({
      next: (commentaires) => {
        this.commentaires = commentaires;
      },
      error: (errors) => {
        console.log(errors)
      },
      complete: () =>{
        console.log('chargerCommentaires OK');
      }
    })
  }

  update(){
    this._route.navigate(['article','update', this.article.id]);
  }

  delete(){
    this._route.navigate(['article','delete',this.article.id]);
  }
  
  signalement(){
    this._articleService.Signalement(this.article.id).subscribe(
      {
        next: (data) => {},
        error: (errors) => {
          console.log(errors)
        },
        complete: () => {
          console.log('Signaler article');
          this.refresh();
        }
      }
    );
  }

  designaler(){
    this._articleService.Designaler(this.article.id).subscribe(
      {
        next: (data) => {},
        error: (errors) => {
          console.log(errors);
        },
        complete: () => {
          console.log('Désignaler article');
          this.refresh();
        }
      }
    );
  }

  //================== PARTIE COMMENTAIRES
  envoyerCommentaire(){
    if(this.commentaireForm.invalid){
      return;
    }
    let id_article: number = this.article.id;
    let commentaire: string = this.commentaireForm.value['commentaire'];
    /*this._commentaireService.Create({id_article: id_article, commentaire: commentaire}).subscribe(
      {
        error: (errors) => {
          console.log(errors);
        }, 
        complete: () => {
          this.commentaireForm.setValue({commentaire: ''});
          this.chargerCommentaires();
        }
      }
    );*/

    this.hubConnection.invoke("CreateCommentaire", this._sessionService.currentUser.id, {id_article: id_article, commentaire: commentaire}).catch(err => console.log(err));
  }
}