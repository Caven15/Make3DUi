import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../models/loginForm.model';
import { RegisterForm } from '../models/registerForm.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _client: HttpClient) { }

  register(user:RegisterForm) : void{
    this._client.post(`${environment.apiUrl}/Auth/Register`, user);
  }

  login(userLogin:LoginForm) : Observable<User>{
    var user = this._client.post<User>(`${environment.apiUrl}/Auth/Login`, userLogin, {headers : new HttpHeaders({'Access-Control-Allow-Origin':'*'})});
    return user;
  }

}
