import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public article: Article;
  public updateForm: FormGroup;

  constructor(private _activatedRoute: ActivatedRoute, private _route: Router, private _articleService: ArticleService, private _authService : AuthService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    // L'utilisateur n'est pas connecté
    if(!this._authService.isConnected()){
      this._route.navigate(['auth', 'login']);
      return;
    }
    // L'utilisateur est connecté
    let id: number = parseInt(this._activatedRoute.snapshot.params['id']);
    this._articleService.GetById(id).subscribe(
      {
        next: (article) => {
          this.article = article;
        },
        error: (errors) => {
          console.log(errors)
        },
        complete: () => {
          console.log('refresh OK');
          // Si l'article n'existe pas
          if (!this.article || this.article == null){
            this._route.navigate(['article']); // charge index par default a condition que la page existe !
            return;
          }
          // Si l'article existe
          if(this.article.id_utilisateur != this._authService.currentUserValue.id){// Si pas créateur
            this._route.navigate(['article']); // charge index par default a condition que la page existe !
            return;
          }
          // Si créateur alors créer le formulaire update
          this.updateForm = this._formBuilder.group({
            nom : [this.article.nom, [Validators.required]],
            description : [this.article.description, [Validators.required]]
          });
        }
      }
    );
  }

  annuler(){
    this._route.navigate(['article','detail', this.article.id]);
  }

  update(){
    if(this.updateForm.invalid){
      return;
    }
    // Si le formulaire est valide
    let nom: string = this.updateForm.value['nom'];
    let description: string = this.updateForm.value['description'];
    this._articleService.Update(this.article.id, nom, description).subscribe({
      error: (errors) =>{
        console.log(errors);
      },
      complete: () => {
        console.log('article modifié');
        this._route.navigate(['article','detail', this.article.id]);
      }
    });
  }
}
