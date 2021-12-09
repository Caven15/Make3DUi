import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Article } from 'src/app/models/article/article.model';
import { FichierService } from 'src/app/services/fichier.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() articleItem : Article;
  public imageSource : SafeUrl = "/assets/default.jpg";
  
  constructor(private _fichierService: FichierService) { }

  ngOnInit(): void {
    if(this.articleItem && this.articleItem.id_fichiers && this.articleItem.id_fichiers.length > 0){
      this._fichierService.TelechargementOne(this.articleItem.id_fichiers[0]).subscribe(
        {
          next: (url) => {
            console.log('Image ok : ' + url);
            this.imageSource = url;
          },
          error: (error) => {
            console.log('Image pas ok : ');
            this.imageSource = "/assets/default.jpg";
          }
        }
      );
    }
    else{
      console.log('Image par défaut ');
      this.imageSource = "/assets/default.jpg";
    }
  }
}
