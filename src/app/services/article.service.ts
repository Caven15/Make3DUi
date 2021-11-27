import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private _client: HttpClient) { }
    
  GetAll() : Observable<Article[]>{ // création d'un observable dans le cas ou nous voulons récuperer des donnée de l'api
    var articles = this._client.get<Article[]>(`${environment.apiUrl}/Article/GetAll`);
    return articles;
  }

  Create(nom: string, description: string) {
    return this._client.post(`${environment.apiUrl}/Article/Create`, {nom: nom, description: description}).subscribe();//
  }
}