import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commentaire } from '../models/commentaire/commentaire.model';
import { CommentaireCreate } from '../models/commentaire/commentaireCreate.model';
import { CommentaireUpdate } from '../models/commentaire/commentaireUpdate.model';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(private _client: HttpClient) { }

  //======================= RECUPERATION ================================================

  // récupération de tout les Commetaires
  GetAll() : Observable<Commentaire[]>{
    return this._client.get<Commentaire[]>(`${environment.apiUrl}/Commentaire/GetAll`);
  } 

  // récupération de tout les commentaire par l'id de son article
  GetAllByArticleId(id : number) : Observable<Commentaire[]>{
    return this._client.get<Commentaire[]>(`${environment.apiUrl}/Commentaire/GetAllByArticleId/${id}`);
  }

  // récupération d'un commentaire par son id 
  GetById(id : number) : Observable<Commentaire>{
    return this._client.get<Commentaire>(`${environment.apiUrl}/Commentaire/${id}/Detail`);
  }

    //======================= Création / Modification / Suppression =====================

  // création d'un commentaire 
  Create(model : CommentaireCreate): Observable<any>{
    return this._client.post(`${environment.apiUrl}/Commentaire/Create`, model);
  }

  // modification d'un commentaire par son créateur
  Update(id : number, model : CommentaireUpdate): Observable<any>{
    return this._client.put(`${environment.apiUrl}/Commentaire/${id}/Update`, model);
  }

  // supprime un commentaire par son id 
  Delete(id : number): Observable<any>{
    return this._client.delete(`${environment.apiUrl}/Commentaire/${id}/Delete`);
  }
}
