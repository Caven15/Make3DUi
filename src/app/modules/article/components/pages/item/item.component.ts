import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article/article.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() articleItem : Article;
  
  constructor() { }

  ngOnInit(): void {
  }

  getImageToShow(): string{
    if(this.articleItem && this.articleItem.id_fichiers.length > 0){
      return `${environment.apiUrl}/Fichier/Telechargement/${this.articleItem.id_fichiers[0]}`;
    }
    else{
      return "/assets/default.jpg";
    }
  }

}
