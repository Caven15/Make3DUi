import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public createForm : FormGroup;
  constructor(
    private _articleService : ArticleService, 
    private _route : Router, 
    private _authService : AuthService, 
    private _formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.createForm = this._formBuilder.group({
      nom : [null, [Validators.required]],
      description : [null, [Validators.required]],
    });
  }

  create(){
    if(!this._authService.isConnected()){
      this._route.navigate(['auth','login']);
      return;
    }
    if(this.createForm.invalid){
      return;
    }
    let nom : string = this.createForm.value['nom'];
    let description : string = this.createForm.value['description'];
    this._articleService.Create(nom, description).subscribe(
      {
        next: (data) => {},
        error: (errors) => {
          console.log(errors)
        },
        complete: () => {
          console.log('Créarion article');
          this._route.navigate(['home']);
        }
      }
    ); // subscribe permet d'envoyer la requete vers l'api 
    
  }
  

}
