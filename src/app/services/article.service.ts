import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private _client: HttpClient) { }


  //======================= RECUPERATION ================================================

  
  GetAll() : Observable<Article[]>{ // création d'un observable dans le cas ou nous voulons récuperer des donnée de l'api
    var articles = this._client.get<Article[]>(`${environment.apiUrl}/Article/GetAll`);
    return articles;
  }

  GetAllByUserId(id : number) : Observable<Article[]>
  {
    var articles = this._client.get<Article[]>(`${environment.apiUrl}/Article/GetAllByUser/${id}`);
    return articles;
  }

  GetById(id : number) : Observable<Article>
  {
    var articles = this._client.get<Article>(`${environment.apiUrl}/Article/${id}/Detail`);
    return articles;
  }


  //======================= #region Création / Modification / Suppression ================================================


  Create(nom: string, description: string) {
    return this._client.post(`${environment.apiUrl}/Article/Create`, {nom: nom, description: description});//
  }

  Update(id: number, nom: string, description: string)
  {
    return this._client.put(`${environment.apiUrl}/Article/${id}/Update`, {nom: nom, description: description});//
  }

  Delete(id: number)
  {
    return this._client.delete(`${environment.apiUrl}/Article/${id}/Delete`);//
  }


 //======================= #region Signalements des articles


Signalement(id: number)
{
  return this._client.get(`${environment.apiUrl}/Article/${id}/Signalement`);//.subscribe();//
}

  Designaler(id: number) // Id article
  {
    return this._client.put(`${environment.apiUrl}/Article/${id}/Designaler`, null);//.subscribe();//
  }

  EstSignale(id: number) : Observable<boolean> // Id article
  {
    return this._client.get<boolean>(`${environment.apiUrl}/Article/${id}/EstSignale`);//
  }

  EstSignaleParUserId(id: number, signaleurId: number) : Observable<boolean>
  {
    return this._client.get<boolean>(`${environment.apiUrl}/Article/${id}/EstSignalePar/${signaleurId}`);//
  }


  //======================= #region Bloquage


  Bloquer(id: number, motivation: string)
  {
    return this._client.post(`${environment.apiUrl}/Article/${id}/Bloquer`, {motivation: motivation});//
  }

  Debloquer(id: number)
  {
      return this._client.get(`${environment.apiUrl}/Article/${id}/Debloquer`);//
  }

  EstBloquer(id: number) : Observable<boolean> // Id article
  {
    return this._client.get<boolean>(`${environment.apiUrl}/Article/${id}/EstBloquer`);//
  }
}