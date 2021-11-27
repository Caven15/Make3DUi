import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/models/loginForm.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login-utilisateur',
  templateUrl: './login-utilisateur.component.html',
  styleUrls: ['./login-utilisateur.component.scss']
})
export class LoginUtilisateurComponent implements OnInit {

  public LoginForm : FormGroup;
  public user : LoginForm;

  constructor(private _route : Router, private _authService : AuthService, private _sessionService : SessionService, private _formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.LoginForm = this._formBuilder.group({
      email : [null, [Validators.email,Validators.required]],
      password : [null, [Validators.required, Validators.minLength(2), Validators.minLength(20)]]
    })
  }

  login(): void{
    console.log("connection");
    this.user = new LoginForm;
    this.user.email = this.LoginForm.value["email"];
    this.user.password = this.LoginForm.value["password"];
    let currentUser : User;
    this._authService.Login(this.LoginForm.value).subscribe(user => {
      currentUser = user;
      console.log(currentUser);
      if (currentUser && currentUser != null){
        this._sessionService.currentUser=currentUser;
        this._route.navigate(["utilisateur", 'utilisateur']);
      }
    });
  }
}
