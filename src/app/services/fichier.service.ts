import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FichierService {

  constructor(private _client: HttpClient, private _sanitizer : DomSanitizer) { }

  //======================= RECUPERATION ================================================

  // récupération de plusiers fichiers
  TelechargementMore(id_fichiers: number[]) : Observable<SafeUrl[]>{
    return this._client.post<any[]>(`${environment.apiUrl}/Fichier/Telechargements`, id_fichiers)
    .pipe(
        map(
            files => {
                let imageSources : SafeUrl[] = [];
                for(let file of files){
                    let objectURL = `data:${file.contentType};base64,${file.fileContents}`;
                    imageSources.push(this._sanitizer.bypassSecurityTrustUrl(objectURL));
                }
                return imageSources;
            }
        )
    );
  } 

  // récupération d'un fichier par son id 
  TelechargementOne(id : number) : Observable<SafeUrl>{
    return this._client.get<any>(`${environment.apiUrl}/Fichier/Telechargement/${id}`)
    .pipe(
        map(
            file => {
                let objectURL = `data:${file.contentType};base64,${file.fileContents}`;
                let imageSource : SafeUrl = this._sanitizer.bypassSecurityTrustUrl(objectURL);
                return imageSource;
            }
        )
    );
  } 
}
