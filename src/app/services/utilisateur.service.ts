import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private _client: HttpClient) { }

  Get() : Observable<User>{
    var user = this._client.get<User>(`${environment.apiUrl}/Utilisateur`);
    return user;
  }
}
