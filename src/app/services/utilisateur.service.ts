import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/utilisateur/user.model';
import { UserPublique } from '../models/utilisateur/userPublique.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private _client: HttpClient) { }

  GetOne() : Observable<User>{
    var user = this._client.get<User>(`${environment.apiUrl}/Utilisateur/GetOne`);
    return user;
  }

  GetById(id : number) : Observable<UserPublique>{
    var user = this._client.get<UserPublique>(`${environment.apiUrl}/Utilisateur/GetById/${id}`);
    return user;
  }
}
