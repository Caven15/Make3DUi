import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../models/auth/loginForm.model';
import { RegisterForm } from '../models/auth/registerForm.model';
import { User } from '../models/utilisateur/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _client: HttpClient) { }

  Register(user:RegisterForm) : void{
    this._client.post(`${environment.apiUrl}/Auth/Register`, user);
  }

  Login(userLogin:LoginForm) : Observable<User>{//
    console.log(userLogin);
    return this._client.post<any>(`${environment.apiUrl}/Auth/Login`, userLogin);/*{email: "aze", password: "aze"}.subscribe(user => {//
      console.log('user1');
      console.log(user);
      console.log('user2');
      return user;
    });*/
  }

}
